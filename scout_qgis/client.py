"""
Scout API client — all HTTP calls in one place.
All methods are synchronous; call them from a Worker thread, not the main thread.
"""

import json
import os
import uuid as _uuid
import urllib.request
import urllib.error
import urllib.parse
from typing import Optional, List, Any, Callable


def _safe_urlopen(req, timeout=30):
    """Wrapper around urlopen that validates the URL scheme is http or https."""
    url = req.full_url if hasattr(req, 'full_url') else req
    parsed = urllib.parse.urlparse(url)
    if parsed.scheme not in ('http', 'https'):
        raise ValueError(f'Blocked URL scheme {parsed.scheme!r} — only http and https are allowed.')
    return urllib.request.urlopen(req, timeout=timeout)  # nosec B310


class ScoutError(Exception):
    """Raised for HTTP errors from the Scout API."""
    def __init__(self, status: int, message: str):
        self.status = status
        super().__init__(f'Scout {status}: {message}')


class ScoutClient:
    def __init__(self, base_url: str, token: Optional[str] = None):
        self.base_url = base_url.rstrip('/')
        self.token = token

    # ── internals ────────────────────────────────────────────────────────────

    def _headers(self, extra: Optional[dict] = None) -> dict:
        h = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'User-Agent': 'Mozilla/5.0 (compatible; Scout-QGIS-Plugin/0.1.0)',
        }
        if self.token:
            h['Authorization'] = f'Bearer {self.token}'
        if extra:
            h.update(extra)
        return h

    def _get(self, path: str) -> Any:
        url = f'{self.base_url}{path}'
        req = urllib.request.Request(url, headers=self._headers())
        try:
            with _safe_urlopen(req, timeout=30) as resp:
                return json.loads(resp.read().decode())
        except urllib.error.HTTPError as e:
            body = e.read().decode(errors='replace')
            try:
                msg = json.loads(body).get('error', body)
            except Exception:
                msg = body
            raise ScoutError(e.code, msg)

    def _post(self, path: str, body: dict) -> Any:
        url = f'{self.base_url}{path}'
        data = json.dumps(body).encode()
        req = urllib.request.Request(url, data=data, headers=self._headers(), method='POST')
        try:
            with _safe_urlopen(req, timeout=60) as resp:
                return json.loads(resp.read().decode())
        except urllib.error.HTTPError as e:
            body = e.read().decode(errors='replace')
            try:
                msg = json.loads(body).get('error', body)
            except Exception:
                msg = body
            raise ScoutError(e.code, msg)

    def _post_binary(self, path: str, body: dict) -> bytes:
        url = f'{self.base_url}{path}'
        data = json.dumps(body).encode()
        req = urllib.request.Request(url, data=data, headers=self._headers(), method='POST')
        try:
            with _safe_urlopen(req, timeout=120) as resp:
                return resp.read()
        except urllib.error.HTTPError as e:
            body = e.read().decode(errors='replace')
            try:
                msg = json.loads(body).get('error', body)
            except Exception:
                msg = body
            raise ScoutError(e.code, msg)

    def _get_binary(self, path: str) -> bytes:
        url = f'{self.base_url}{path}'
        req = urllib.request.Request(url, headers=self._headers())
        try:
            with _safe_urlopen(req, timeout=120) as resp:
                return resp.read()
        except urllib.error.HTTPError as e:
            raise ScoutError(e.code, e.reason)

    # ── catalog / metadata ────────────────────────────────────────────────────

    def catalog(self) -> dict:
        """Fetch datasets owned by the current user (auth), or full public catalog."""
        if self.token:
            return self._get('/api/my-catalog')
        return self._get('/api/stac/catalog.json')

    def item(self, name: str) -> dict:
        """Fetch STAC item for a dataset (bbox, assets, feature count, etc.)."""
        return self._get(f'/api/stac/{urllib.parse.quote(name)}/item.json')

    def schema(self, name: str) -> dict:
        """Fetch column schema for a dataset: {columns: [{name, type}]}."""
        return self._get(f'/api/schema/{urllib.parse.quote(name)}')

    def describe(self, name: str) -> dict:
        """AI dataset description + 4 ready-to-run SQL suggestions."""
        return self._get(f'/api/ai/describe/{urllib.parse.quote(name)}')

    # ── account ───────────────────────────────────────────────────────────────

    def me(self) -> dict:
        """Fetch current user plan and usage. Requires token."""
        return self._get('/api/me')

    def sign_in(self, email: str, password: str) -> str:
        """Sign in with email + password. Returns the access_token JWT."""
        data = self._post('/api/auth/token', {'email': email, 'password': password})
        token = data.get('access_token', '')
        if not token:
            raise ScoutError(401, 'No access token returned.')
        return token

    # ── upload + ingest ───────────────────────────────────────────────────────

    def presign_upload(self, filename: str) -> dict:
        """
        POST /api/upload/presign → {putUrl, r2Key, ext}
        Gets a presigned R2 PUT URL so the file can be uploaded directly
        without going through the Next.js server.
        """
        return self._post('/api/upload/presign', {'filename': filename})

    def put_to_r2(self, put_url: str, file_path: str,
                  on_progress: Optional[Callable[[str], None]] = None) -> None:
        """
        PUT a file directly to an R2 presigned URL (no auth header needed).
        Streams in 4 MB chunks so large files work.
        """
        file_size = os.path.getsize(file_path)
        h = {
            'Content-Type': 'application/octet-stream',
            'Content-Length': str(file_size),
            'User-Agent': 'Mozilla/5.0 (compatible; Scout-QGIS-Plugin/0.1.0)',
        }
        CHUNK = 4 * 1024 * 1024  # 4 MB

        with open(file_path, 'rb') as f:
            data = f.read()

        req = urllib.request.Request(put_url, data=data, headers=h, method='PUT')
        try:
            with _safe_urlopen(req, timeout=600):
                pass
        except urllib.error.HTTPError as e:
            raise ScoutError(e.code, f'R2 upload failed: {e.reason}')

    def ingest_stream(self, name: str, max_zoom: int = 12,
                      upload_id: Optional[str] = None,
                      upload_ext: Optional[str] = None,
                      r2_key: Optional[str] = None,
                      on_progress: Optional[Callable[[str], None]] = None) -> dict:
        """
        POST /api/ingest as SSE stream.
        Pass either (upload_id + upload_ext) for local upload, or r2_key for R2 upload.
        Calls on_progress(msg) for each progress event.
        Returns the PipelineResult dict on success.
        """
        body_dict: dict = {'name': name, 'maxZoom': max_zoom}
        if r2_key:
            body_dict['r2Key'] = r2_key
        elif upload_id and upload_ext:
            body_dict['uploadId']  = upload_id
            body_dict['uploadExt'] = upload_ext
        else:
            raise ValueError('Provide either r2_key or (upload_id + upload_ext)')

        url  = f'{self.base_url}/api/ingest'
        data = json.dumps(body_dict).encode()
        h = self._headers({'Accept': 'text/event-stream'})

        req = urllib.request.Request(url, data=data, headers=h, method='POST')
        current_event: Optional[str] = None

        try:
            with _safe_urlopen(req, timeout=600) as resp:
                while True:
                    raw = resp.readline()
                    if not raw:
                        break
                    line = raw.decode('utf-8').rstrip('\r\n')
                    if line.startswith('event:'):
                        current_event = line[6:].strip()
                    elif line.startswith('data:'):
                        data_str = line[5:].strip()
                        if current_event == 'progress':
                            if on_progress:
                                on_progress(data_str)
                        elif current_event == 'done':
                            return json.loads(data_str)
                        elif current_event == 'error':
                            try:
                                msg = json.loads(data_str).get('message', data_str)
                            except Exception:
                                msg = data_str[:300]
                            raise ScoutError(500, msg)
                        current_event = None
        except urllib.error.HTTPError as e:
            raw_body = e.read().decode(errors='replace')
            try:
                msg = json.loads(raw_body).get('error', raw_body)
            except Exception:
                msg = raw_body[:300]
            raise ScoutError(e.code, msg)

        raise ScoutError(500, 'Ingest stream ended without a done event.')

    # ── AI ────────────────────────────────────────────────────────────────────

    def ai_ask(self, question: str, datasets: List[str],
               history: Optional[list] = None) -> dict:
        body: dict = {'question': question, 'datasets': datasets}
        if history:
            body['history'] = history
        return self._post('/api/ai/ask', body)

    def ai_style(self, prompt: str, columns: List[dict]) -> dict:
        return self._post('/api/ai/style', {'prompt': prompt, 'columns': columns})

    # ── exports ───────────────────────────────────────────────────────────────

    def export_gpkg(self, sql: str) -> bytes:
        return self._post_binary('/api/ai/export/gpkg', {'sql': sql})

    def export_parquet(self, sql: str) -> bytes:
        return self._post_binary('/api/ai/export/parquet', {'sql': sql})

    def export_tiles(self, sql: str, question: str,
                     symbology: Optional[dict] = None) -> dict:
        body: dict = {'sql': sql, 'question': question}
        if symbology:
            body['symbology'] = symbology
        return self._post('/api/ai/export/tiles', body)

    def download_gpkg(self, name: str) -> bytes:
        return self._get_binary(f'/api/stac/{urllib.parse.quote(name)}/data.gpkg')

    def download_pmtiles(self, name: str) -> bytes:
        return self._get_binary(f'/api/stac/{urllib.parse.quote(name)}/data.pmtiles')

    # ── URLs (no HTTP call) ───────────────────────────────────────────────────

    def wfs_url(self, name: str) -> str:
        return f'{self.base_url}/api/wfs/{urllib.parse.quote(name)}'

    def xyz_url(self, name: str) -> str:
        return f'{self.base_url}/api/xyz/{urllib.parse.quote(name)}/{{z}}/{{x}}/{{y}}'

    def tilejson_url(self, name: str) -> str:
        """TileJSON descriptor — use this for QGIS vector tile layers (no {z}/{x}/{y} encoding issues)."""
        return f'{self.base_url}/api/xyz/{urllib.parse.quote(name)}/tilejson.json'

    def viewer_url(self, name: str) -> str:
        return f'{self.base_url}/api/stac/{urllib.parse.quote(name)}/viewer'

    def pmtiles_url(self, name: str) -> str:
        return f'{self.base_url}/api/stac/{urllib.parse.quote(name)}/data.pmtiles'

    def parquet_url(self, name: str) -> str:
        return f'{self.base_url}/api/stac/{urllib.parse.quote(name)}/data.parquet'

    def gpkg_url(self, name: str) -> str:
        return f'{self.base_url}/api/stac/{urllib.parse.quote(name)}/data.gpkg'

    def stac_item_url(self, name: str) -> str:
        return f'{self.base_url}/api/stac/{urllib.parse.quote(name)}/item.json'
