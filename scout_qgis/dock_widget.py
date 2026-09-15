"""
ScoutDockWidget — 3-tab panel.

Tab 0 · Account    — sign in, docs
Tab 1 · AI Catalog — publish QGIS layers → Scout, browse catalog, schema,
                     AI suggestions, load layers, ask AI questions
Tab 2 · Plans      — pricing, upgrade
"""

import os
import tempfile
import webbrowser
import urllib.parse

from qgis.PyQt.QtWidgets import (
    QDockWidget, QWidget, QVBoxLayout, QHBoxLayout, QTabWidget,
    QLabel, QLineEdit, QPushButton, QListWidget, QListWidgetItem,
    QPlainTextEdit, QTextBrowser, QGroupBox, QScrollArea,
    QSizePolicy, QProgressBar, QFrame, QApplication,
    QHeaderView, QAbstractItemView, QSpinBox,
)
from qgis.PyQt.QtCore import Qt, pyqtSlot
from qgis.PyQt.QtGui import QColor
from qgis.core import (
    QgsProject, QgsVectorLayer, QgsRasterLayer,
    QgsVectorFileWriter, QgsCoordinateReferenceSystem,
    QgsCoordinateTransform,
)

try:
    from qgis.core import QgsVectorTileLayer
    _HAS_VECTOR_TILES = True
except ImportError:
    _HAS_VECTOR_TILES = False

try:
    from qgis.gui import QgsMapLayerComboBox
    from qgis.core import QgsMapLayerProxyModel
    _HAS_LAYER_COMBO = True
except ImportError:
    _HAS_LAYER_COMBO = False

from . import settings as cfg
from .client import ScoutClient, ScoutError
from .worker import Worker

# ── Qt5 / Qt6 enum compatibility ─────────────────────────────────────────────
def _qe(obj, *paths):
    for path in paths:
        try:
            result = obj
            for p in path.split('.'):
                result = getattr(result, p)
            return result
        except AttributeError:
            continue
    raise AttributeError(f'Qt enum not found: {paths}')

_HLine          = _qe(QFrame,            'Shape.HLine',               'HLine')
_UserRole       = _qe(Qt,                'ItemDataRole.UserRole',      'UserRole')
_AlignCenter    = _qe(Qt,                'AlignmentFlag.AlignCenter',  'AlignCenter')
_TextSelectable = _qe(Qt,                'TextInteractionFlag.TextSelectableByMouse', 'TextSelectableByMouse')
_HeaderStretch  = _qe(QHeaderView,       'ResizeMode.Stretch',         'Stretch')
_NoEditTriggers = _qe(QAbstractItemView, 'EditTrigger.NoEditTriggers', 'NoEditTriggers')
_NoSelection    = _qe(QAbstractItemView, 'SelectionMode.NoSelection',  'NoSelection')
_EchoPassword   = _qe(QLineEdit,         'EchoMode.Password',          'Password')
_Expanding      = _qe(QSizePolicy,       'Policy.Expanding',           'Expanding')
_Fixed          = _qe(QSizePolicy,       'Policy.Fixed',               'Fixed')

# ── Plans ─────────────────────────────────────────────────────────────────────
PLAN_LIMITS = {
    'free':         {'label': 'Free',         'price': '$0',     'datasets': 10,   'ai': 5,    'storage': '1 GB',      'color': '#6b7280'},
    'solo':         {'label': 'Solo',         'price': '$9/mo',  'datasets': 60,   'ai': 40,   'storage': '10 GB',     'color': '#3b82f6'},
    'professional': {'label': 'Professional', 'price': '$39/mo', 'datasets': 600,  'ai': 400,  'storage': '50 GB',     'color': '#8b5cf6'},
    'enterprise':   {'label': 'Enterprise',   'price': 'Custom', 'datasets': None, 'ai': None, 'storage': 'Unlimited', 'color': '#f59e0b'},
}

# ── Widget helpers ────────────────────────────────────────────────────────────

def _lbl(text: str, bold: bool = False, color: str = '') -> QLabel:
    l = QLabel(text)
    l.setWordWrap(True)
    if bold:
        f = l.font(); f.setBold(True); l.setFont(f)
    if color:
        l.setStyleSheet(f'color:{color};')
    return l


def _btn(text: str, primary: bool = False) -> QPushButton:
    b = QPushButton(text)
    if primary:
        b.setStyleSheet(
            'QPushButton{background:#3b82f6;color:#fff;border:none;'
            'border-radius:4px;padding:6px 12px;font-weight:bold;}'
            'QPushButton:hover{background:#2563eb;}'
            'QPushButton:disabled{background:#6b7280;}'
        )
    else:
        b.setStyleSheet(
            'QPushButton{border:1px solid #4b5563;border-radius:4px;padding:5px 10px;}'
            'QPushButton:hover{background:#374151;}'
            'QPushButton:disabled{color:#6b7280;}'
        )
    return b


def _separator() -> QFrame:
    f = QFrame()
    f.setFrameShape(_HLine)
    f.setStyleSheet('color:#374151;')
    return f


def _field(placeholder: str, password: bool = False) -> QLineEdit:
    e = QLineEdit()
    e.setPlaceholderText(placeholder)
    e.setStyleSheet(
        'background:#1f2937;border:1px solid #374151;border-radius:4px;'
        'padding:6px 8px;color:#e5e7eb;font-size:13px;'
    )
    if password:
        e.setEchoMode(_EchoPassword)
    return e


def _section_label(text: str) -> QLabel:
    l = QLabel(text)
    f = l.font(); f.setBold(True); f.setPointSize(10); l.setFont(f)
    l.setStyleSheet('color:#9ca3af;letter-spacing:0.08em;font-size:10px;padding:2px 0;')
    return l


# ═════════════════════════════════════════════════════════════════════════════
class ScoutDockWidget(QDockWidget):
    def __init__(self, iface):
        super().__init__('Scout', iface.mainWindow())
        self.iface    = iface
        self._workers: list = []
        self._datasets: list = []
        self._last_sql: str = ''
        self._last_question: str = ''

        self.setMinimumWidth(280)
        self.setMaximumWidth(420)
        self.setObjectName('ScoutDockWidget')

        root = QWidget()
        root.setStyleSheet('background:#111827;color:#e5e7eb;')
        layout = QVBoxLayout(root)
        layout.setContentsMargins(0, 0, 0, 0)
        layout.setSpacing(0)

        # ── Header ────────────────────────────────────────────────────────
        header = QWidget()
        header.setStyleSheet('background:#1f2937;border-bottom:1px solid #374151;')
        hl = QHBoxLayout(header)
        hl.setContentsMargins(12, 8, 12, 8)
        title = QLabel('⬡ Scout')
        tf = title.font(); tf.setBold(True); tf.setPointSize(13); title.setFont(tf)
        title.setStyleSheet('color:#4f8ef7;')
        hl.addWidget(title)
        hl.addStretch()
        self._status_dot = QLabel('○')
        self._status_dot.setStyleSheet('color:#6b7280;font-size:16px;')
        self._status_dot.setToolTip('Not connected')
        hl.addWidget(self._status_dot)
        layout.addWidget(header)

        # ── Tabs ──────────────────────────────────────────────────────────
        self._tabs = QTabWidget()
        self._tabs.setStyleSheet('''
            QTabWidget::pane{border:none;background:#111827;}
            QTabBar::tab{background:#1f2937;color:#9ca3af;padding:7px 10px;border:none;min-width:55px;font-size:11px;}
            QTabBar::tab:selected{background:#111827;color:#e5e7eb;border-bottom:2px solid #4f8ef7;}
            QTabBar::tab:hover{color:#e5e7eb;}
        ''')
        self._tabs.addTab(self._build_account_tab(),  'Account')
        self._tabs.addTab(self._build_catalog_tab(),  'AI Catalog')
        self._tabs.addTab(self._build_plans_tab(),    'Plans')
        layout.addWidget(self._tabs)

        self.setWidget(root)

        # Auto-connect and load usage if token already saved
        if cfg.token():
            self._connect()
            self._load_usage()

    # ── Thread helper ─────────────────────────────────────────────────────

    def _client(self) -> ScoutClient:
        return ScoutClient(cfg.base_url(), cfg.token() or None)

    def _run(self, fn, on_result, on_error=None):
        w = Worker(fn)
        w.result.connect(on_result)
        if on_error:
            w.error.connect(on_error)
        else:
            w.error.connect(lambda msg: self.iface.messageBar().pushWarning('Scout', msg))
        w.finished.connect(lambda: self._workers.remove(w) if w in self._workers else None)
        self._workers.append(w)
        w.start()
        return w

    def _set_connected(self, ok: bool):
        if ok:
            self._status_dot.setText('●')
            self._status_dot.setStyleSheet('color:#10b981;font-size:16px;')
            self._status_dot.setToolTip('Connected')
        else:
            self._status_dot.setText('○')
            self._status_dot.setStyleSheet('color:#ef4444;font-size:16px;')
            self._status_dot.setToolTip('Connection failed')

    # =========================================================================
    # TAB 0 — Account
    # =========================================================================

    def _build_account_tab(self) -> QWidget:
        w = QWidget()
        scroll = QScrollArea()
        scroll.setWidgetResizable(True)
        scroll.setStyleSheet('QScrollArea{border:none;background:transparent;}')

        inner = QWidget()
        lay = QVBoxLayout(inner)
        lay.setContentsMargins(12, 12, 12, 12)
        lay.setSpacing(12)

        # ── Signed-in card ────────────────────────────────────────────────
        self._signed_in_card = QWidget()
        self._signed_in_card.setStyleSheet(
            'background:#0b1f0b;border:1px solid rgba(16,185,129,0.35);border-radius:6px;'
        )
        sic = QVBoxLayout(self._signed_in_card)
        sic.setContentsMargins(12, 10, 12, 10)
        sic.setSpacing(4)
        self._signed_in_lbl = QLabel('● Signed in')
        self._signed_in_lbl.setStyleSheet('color:#10b981;font-weight:bold;font-size:15px;')
        sic.addWidget(self._signed_in_lbl)
        self._signed_in_email = QLabel(cfg.email())
        self._signed_in_email.setStyleSheet('color:#6ee7b7;font-size:13px;')
        sic.addWidget(self._signed_in_email)
        self._plan_badge = QLabel()
        self._plan_badge.setStyleSheet('color:#9ca3af;font-size:13px;')
        sic.addWidget(self._plan_badge)
        self._usage_label = QLabel()
        self._usage_label.setStyleSheet('color:#9ca3af;font-size:12px;')
        self._usage_label.setWordWrap(True)
        sic.addWidget(self._usage_label)
        self._upgrade_lnk = QLabel(
            '<a href="https://scout.geosolvix.com/#pricing" style="color:#f59e0b;">Upgrade plan →</a>'
        )
        self._upgrade_lnk.setOpenExternalLinks(True)
        self._upgrade_lnk.setStyleSheet('font-size:13px;')
        self._upgrade_lnk.setVisible(False)
        sic.addWidget(self._upgrade_lnk)
        manage_lnk = QLabel(
            '<a href="https://scout.geosolvix.com/account" style="color:#6b7280;">Manage account / change password →</a>'
        )
        manage_lnk.setOpenExternalLinks(True)
        manage_lnk.setStyleSheet('font-size:12px;')
        sic.addWidget(manage_lnk)
        row_sic = QHBoxLayout()
        row_sic.setContentsMargins(0, 6, 0, 0)
        self._refresh_btn = _btn('Refresh')
        self._refresh_btn.clicked.connect(self._load_usage)
        row_sic.addWidget(self._refresh_btn)
        row_sic.addStretch()
        self._signout_btn = _btn('Sign Out')
        self._signout_btn.clicked.connect(self._clear_token)
        row_sic.addWidget(self._signout_btn)
        sic.addLayout(row_sic)
        lay.addWidget(self._signed_in_card)
        self._signed_in_card.setVisible(bool(cfg.token()))

        # ── Sign-in form ──────────────────────────────────────────────────
        self._signin_section = QWidget()
        self._signin_section.setVisible(not bool(cfg.token()))
        ss = QVBoxLayout(self._signin_section)
        ss.setContentsMargins(0, 0, 0, 0)
        ss.setSpacing(10)

        ss.addWidget(_lbl('Sign in to Scout', bold=True))

        ss.addWidget(_lbl('Email', color='#9ca3af'))
        self._email_edit = _field('you@example.com')
        ss.addWidget(self._email_edit)

        ss.addWidget(_lbl('Password', color='#9ca3af'))
        self._password_edit = _field('••••••••', password=True)
        ss.addWidget(self._password_edit)

        self._signin_btn = _btn('Sign In', primary=True)
        self._signin_btn.setMinimumHeight(34)
        self._signin_btn.setSizePolicy(_Expanding, _Fixed)
        self._signin_btn.clicked.connect(self._sign_in)
        ss.addWidget(self._signin_btn)

        self._signin_status = _lbl('', color='#ef4444')
        self._signin_status.setWordWrap(True)
        self._signin_status.setMaximumWidth(360)
        ss.addWidget(self._signin_status)

        signup_lnk = QLabel(
            'No account? '
            '<a href="https://scout.geosolvix.com/auth/signup" style="color:#4f8ef7;">'
            'Create one free →</a>'
        )
        signup_lnk.setOpenExternalLinks(True)
        signup_lnk.setStyleSheet('font-size:12px;color:#6b7280;')
        ss.addWidget(signup_lnk)

        lay.addWidget(self._signin_section)

        lay.addWidget(_separator())

        # ── Server URL ────────────────────────────────────────────────────
        lay.addWidget(_section_label('SERVER'))
        url_row = QHBoxLayout()
        self._base_url_edit = _field('https://scout.geosolvix.com')
        self._base_url_edit.setText(cfg.base_url())
        url_row.addWidget(self._base_url_edit, 1)
        url_save_btn = _btn('Save')
        url_save_btn.setMaximumWidth(50)
        url_save_btn.clicked.connect(self._save_base_url)
        url_row.addWidget(url_save_btn)
        lay.addLayout(url_row)

        lay.addWidget(_separator())

        # ── Docs buttons ──────────────────────────────────────────────────
        btn_guide = _btn('Guide')
        btn_guide.clicked.connect(
            lambda: webbrowser.open('https://scout.geosolvix.com/qgis')
        )
        lay.addWidget(btn_guide)

        btn_docs = _btn('Scout Documentation')
        btn_docs.clicked.connect(
            lambda: webbrowser.open('https://scout.geosolvix.com/docs')
        )
        lay.addWidget(btn_docs)

        lay.addStretch()

        footer = _lbl(
            '<a href="https://scout.geosolvix.com" style="color:#4f8ef7;">scout.geosolvix.com</a>'
            ' · Made by Geosolvix'
        )
        footer.setOpenExternalLinks(True)
        footer.setStyleSheet('color:#6b7280;font-size:11px;')
        footer.setAlignment(_AlignCenter)
        lay.addWidget(footer)

        scroll.setWidget(inner)
        outer = QVBoxLayout(w)
        outer.setContentsMargins(0, 0, 0, 0)
        outer.addWidget(scroll)
        return w

    # ── Account actions ───────────────────────────────────────────────────

    @pyqtSlot()
    def _sign_in(self):
        email    = self._email_edit.text().strip()
        password = self._password_edit.text()
        if not email or '@' not in email:
            self._signin_status.setText('Enter a valid email address.')
            self._signin_status.setStyleSheet('color:#ef4444;')
            return
        if not password:
            self._signin_status.setText('Enter your password.')
            self._signin_status.setStyleSheet('color:#ef4444;')
            return
        self._signin_btn.setEnabled(False)
        self._signin_btn.setText('Signing in…')
        self._signin_status.setText('')
        client = ScoutClient(cfg.base_url())
        self._run(
            lambda: client.sign_in(email, password),
            self._on_signed_in,
            self._on_signin_error,
        )

    @pyqtSlot(object)
    def _on_signed_in(self, token: str):
        self._signin_btn.setEnabled(True)
        self._signin_btn.setText('Sign In')
        cfg.set_token(token)
        email = self._email_edit.text().strip().lower()
        cfg.set_email(email)
        self._signed_in_email.setText(email)
        self._password_edit.clear()
        self._signin_status.setText('')
        self._signed_in_card.setVisible(True)
        self._signin_section.setVisible(False)
        self._load_usage()
        self._connect()
        self._tabs.setCurrentIndex(1)

    @pyqtSlot(str)
    def _on_signin_error(self, msg: str):
        self._signin_btn.setEnabled(True)
        self._signin_btn.setText('Sign In')
        import re as _re
        clean = _re.sub(r'<[^>]+>', '', msg).strip()
        if len(clean) > 120:
            clean = clean[:120] + '…'
        self._signin_status.setText(f'Sign in failed: {clean}')
        self._signin_status.setStyleSheet('color:#ef4444;')

    @pyqtSlot()
    def _save_base_url(self):
        url = self._base_url_edit.text().strip().rstrip('/')
        if not url:
            url = 'https://scout.geosolvix.com'
            self._base_url_edit.setText(url)
        cfg.set_base_url(url)
        self.iface.messageBar().pushSuccess('Scout', f'Server URL saved: {url}')

    @pyqtSlot()
    def _clear_token(self):
        cfg.clear_token()
        self._email_edit.clear()
        self._password_edit.clear()
        self._signin_status.setText('')
        self._signed_in_card.setVisible(False)
        self._signin_section.setVisible(True)
        self._plan_badge.setText('')
        self._usage_label.setText('')
        self._signed_in_email.setText('')
        self._upgrade_lnk.setVisible(False)
        self._conn_badge.setVisible(False)
        self._connect_btn.setVisible(False)
        self._set_connected(False)

    def _handle_session_expired(self):
        """Token is expired or missing — clear it, show sign-in form, notify user."""
        cfg.clear_token()
        self._signed_in_card.setVisible(False)
        self._signin_section.setVisible(True)
        self._signin_status.setText('Session expired — please sign in again.')
        self._signin_status.setStyleSheet('color:#f59e0b;')
        self._plan_badge.setText('')
        self._usage_label.setText('')
        self._signed_in_email.setText('')
        self._upgrade_lnk.setVisible(False)
        self._conn_badge.setVisible(False)
        self._connect_btn.setVisible(False)
        self._set_connected(False)
        self._tabs.setCurrentIndex(0)
        self.iface.messageBar().pushWarning('Scout', 'Session expired — please sign in again.')

    @pyqtSlot()
    def _load_usage(self):
        if not cfg.token():
            self._handle_session_expired()
            return
        self._refresh_btn.setText('Refreshing…')
        w = self._run(
            lambda: self._client().me(),
            self._on_usage,
            self._on_usage_error,
        )
        # Safety net: restore button text even if slots are skipped
        w.finished.connect(lambda: self._refresh_btn.setText('Refresh')
                           if self._refresh_btn.text() == 'Refreshing…' else None)

    @pyqtSlot(str)
    def _on_usage_error(self, msg: str):
        self._refresh_btn.setText('Refresh')
        if '401' in msg or 'unauthorized' in msg.lower():
            self._handle_session_expired()
            return
        import re as _re
        clean = _re.sub(r'<[^>]+>', '', msg).strip()[:80]
        self._usage_label.setText(f'Could not load usage: {clean}')
        self.iface.messageBar().pushWarning('Scout', f'Could not refresh account: {clean}')

    @pyqtSlot(object)
    def _on_usage(self, data: dict):
        self._refresh_btn.setText('Refresh')
        plan_key   = data.get('plan', 'free')
        plan       = PLAN_LIMITS.get(plan_key, PLAN_LIMITS['free'])
        storage    = data.get('storageUsedGb', 0)
        ai_used    = data.get('aiQueriesThisMonth', 0)
        color      = plan.get('color', '#6b7280')
        self._signed_in_lbl.setText(f'● Signed in  ·  {plan["label"]} plan')
        self._signed_in_lbl.setStyleSheet(f'color:{color};font-weight:bold;font-size:13px;')
        self._plan_badge.setText(f'{plan["price"]}  ·  {plan["storage"]} storage')
        ai_lim = plan['ai']
        ds_lim = plan['datasets']
        ai_str = f'{ai_used} / {"∞" if ai_lim is None else ai_lim}'
        self._usage_label.setText(
            f'Datasets: {"∞" if ds_lim is None else ds_lim}  ·  '
            f'AI queries this month: {ai_str}  ·  '
            f'Storage: {storage:.2f} GB'
        )
        self._upgrade_lnk.setVisible(plan_key == 'free')

    # =========================================================================
    # TAB 1 — AI Catalog
    # =========================================================================

    def _build_catalog_tab(self) -> QWidget:
        w = QWidget()
        scroll = QScrollArea()
        scroll.setWidgetResizable(True)
        scroll.setStyleSheet('QScrollArea{border:none;background:transparent;}')

        inner = QWidget()
        lay = QVBoxLayout(inner)
        lay.setContentsMargins(10, 10, 10, 10)
        lay.setSpacing(10)

        # ── SECTION 1: Publish Layer ──────────────────────────────────────
        lay.addWidget(_section_label('PUBLISH LAYER TO SCOUT'))

        if _HAS_LAYER_COMBO:
            self._layer_combo = QgsMapLayerComboBox()
            self._layer_combo.setFilters(QgsMapLayerProxyModel.Filter.VectorLayer)
            self._layer_combo.setStyleSheet(
                'background:#1f2937;border:1px solid #374151;border-radius:4px;'
                'padding:4px;color:#e5e7eb;'
            )
            lay.addWidget(self._layer_combo)
        else:
            self._layer_combo = None
            lay.addWidget(_lbl('Layer selector unavailable in this QGIS version.', color='#6b7280'))

        name_zoom_row = QHBoxLayout()
        self._pub_name_edit = _field('Dataset name (e.g. my-buildings)')
        name_zoom_row.addWidget(self._pub_name_edit, 3)
        zoom_lbl = QLabel('Max Zoom')
        zoom_lbl.setStyleSheet('color:#9ca3af;font-size:11px;')
        name_zoom_row.addWidget(zoom_lbl)
        self._pub_zoom = QSpinBox()
        self._pub_zoom.setRange(6, 18)
        self._pub_zoom.setValue(12)
        self._pub_zoom.setStyleSheet(
            'background:#1f2937;border:1px solid #374151;border-radius:4px;'
            'padding:4px;color:#e5e7eb;'
        )
        name_zoom_row.addWidget(self._pub_zoom)
        lay.addLayout(name_zoom_row)

        self._publish_btn = _btn('Publish to Scout', primary=True)
        self._publish_btn.setSizePolicy(_Expanding, _Fixed)
        self._publish_btn.clicked.connect(self._run_publish)
        lay.addWidget(self._publish_btn)

        self._pub_progress = QProgressBar()
        self._pub_progress.setRange(0, 0)
        self._pub_progress.setVisible(False)
        self._pub_progress.setMaximumHeight(3)
        self._pub_progress.setStyleSheet(
            'QProgressBar{background:#1f2937;border:none;border-radius:2px;}'
            'QProgressBar::chunk{background:#10b981;border-radius:2px;}'
        )
        lay.addWidget(self._pub_progress)

        self._pub_status = _lbl('', color='#9ca3af')
        self._pub_status.setStyleSheet('color:#9ca3af;font-size:11px;')
        self._pub_status.setWordWrap(True)
        lay.addWidget(self._pub_status)

        # ── Published URLs panel (hidden until done) ──────────────────────
        self._pub_urls_widget = QWidget()
        self._pub_urls_widget.setVisible(False)
        self._pub_urls_widget.setStyleSheet(
            'background:#0a1628;border:1px solid rgba(79,142,247,0.25);border-radius:6px;'
        )
        pul = QVBoxLayout(self._pub_urls_widget)
        pul.setContentsMargins(10, 8, 10, 8)
        pul.setSpacing(6)

        self._pub_name_done = QLabel()
        self._pub_name_done.setStyleSheet('color:#4f8ef7;font-weight:bold;font-size:12px;')
        pul.addWidget(self._pub_name_done)

        self._pub_url_rows: dict = {}
        _mini_style = (
            'QPushButton{background:#1f2937;border:1px solid #4b5563;border-radius:3px;'
            'padding:2px 5px;font-size:11px;color:#e5e7eb;}'
            'QPushButton:hover{background:#374151;border-color:#6b7280;}'
            'QPushButton:disabled{color:#4b5563;border-color:#374151;}'
        )
        url_defs = [
            ('wfs',        'WFS'),
            ('xyz',        'XYZ Vector Tiles'),
            ('pmtiles',    'PMTiles'),
            ('geoparquet', 'GeoParquet'),
            ('gpkg',       'GeoPackage'),
            ('viewer',     'Viewer'),
        ]
        for key, label in url_defs:
            # Label row
            lbl = QLabel(f'<b style="color:#aec6ff;font-size:11px;">{label}</b>')
            pul.addWidget(lbl)

            url_row = QHBoxLayout()
            url_row.setSpacing(4)

            # Read-only QLineEdit — full URL visible and horizontally scrollable
            url_edit = QLineEdit()
            url_edit.setReadOnly(True)
            url_edit.setStyleSheet(
                'background:#0d1f38;border:1px solid #1e3a5f;border-radius:3px;'
                'padding:3px 6px;color:#c5d8ff;font-size:11px;'
            )
            url_edit.setPlaceholderText('—')
            url_row.addWidget(url_edit, 1)

            copy_btn = QPushButton('Copy')
            copy_btn.setMaximumWidth(44)
            copy_btn.setStyleSheet(_mini_style)
            copy_btn.clicked.connect(lambda checked, u=url_edit: QApplication.clipboard().setText(u.text()))
            url_row.addWidget(copy_btn)

            if key == 'wfs':
                add_btn = QPushButton('Add')
                add_btn.setMaximumWidth(35)
                add_btn.setStyleSheet(_mini_style)
                add_btn.clicked.connect(lambda checked, u=url_edit: self._add_wfs_from_url(u.text()))
                url_row.addWidget(add_btn)
            elif key == 'xyz':
                add_btn = QPushButton('Add')
                add_btn.setMaximumWidth(35)
                add_btn.setStyleSheet(_mini_style)
                add_btn.clicked.connect(lambda checked, u=url_edit: self._add_xyz_from_url(u.text()))
                url_row.addWidget(add_btn)
            elif key == 'pmtiles':
                add_btn = QPushButton('Add')
                add_btn.setMaximumWidth(35)
                add_btn.setStyleSheet(_mini_style)
                add_btn.clicked.connect(lambda checked, u=url_edit: self._load_pmtiles_from_url(u.text()))
                url_row.addWidget(add_btn)
            elif key == 'geoparquet':
                add_btn = QPushButton('Add')
                add_btn.setMaximumWidth(35)
                add_btn.setStyleSheet(_mini_style)
                add_btn.clicked.connect(lambda checked, u=url_edit: self._load_parquet_from_url(u.text()))
                url_row.addWidget(add_btn)
            elif key == 'gpkg':
                add_btn = QPushButton('Add')
                add_btn.setMaximumWidth(35)
                add_btn.setStyleSheet(_mini_style)
                add_btn.clicked.connect(lambda checked, u=url_edit: self._load_gpkg_from_url(u.text()))
                url_row.addWidget(add_btn)
            elif key == 'viewer':
                open_btn = QPushButton('Open')
                open_btn.setMaximumWidth(40)
                open_btn.setStyleSheet(_mini_style)
                open_btn.clicked.connect(lambda checked, u=url_edit: webbrowser.open(u.text()))
                url_row.addWidget(open_btn)

            pul.addLayout(url_row)
            self._pub_url_rows[key] = url_edit

        # "Load into Scout catalog" convenience button
        load_to_catalog_btn = _btn('↻ Refresh Catalog')
        load_to_catalog_btn.clicked.connect(self._connect)
        pul.addWidget(load_to_catalog_btn)

        lay.addWidget(self._pub_urls_widget)

        lay.addWidget(_separator())

        # ── SECTION 2: Your Catalog ───────────────────────────────────────
        cat_header = QHBoxLayout()
        cat_header.addWidget(_section_label('YOUR CATALOG'))
        cat_header.addStretch()
        self._conn_badge = QLabel()
        self._conn_badge.setVisible(False)
        self._conn_badge.setStyleSheet(
            'color:#10b981;font-size:10px;font-weight:bold;padding:3px 7px;'
            'background:rgba(16,185,129,0.12);border:1px solid rgba(16,185,129,0.3);border-radius:4px;'
        )
        cat_header.addWidget(self._conn_badge)
        self._connect_btn = _btn('↻')
        self._connect_btn.setVisible(False)
        self._connect_btn.setMaximumWidth(32)
        self._connect_btn.setToolTip('Refresh catalog')
        self._connect_btn.clicked.connect(self._connect)
        cat_header.addWidget(self._connect_btn)
        lay.addLayout(cat_header)

        self._cat_progress = QProgressBar()
        self._cat_progress.setRange(0, 0)
        self._cat_progress.setVisible(False)
        self._cat_progress.setMaximumHeight(3)
        self._cat_progress.setStyleSheet(
            'QProgressBar{background:#1f2937;border:none;border-radius:2px;}'
            'QProgressBar::chunk{background:#4f8ef7;border-radius:2px;}'
        )
        lay.addWidget(self._cat_progress)

        lay.addWidget(_lbl('Your datasets  (✓ = include in AI query):', color='#6b7280'))
        self._dataset_list = QListWidget()
        self._dataset_list.setStyleSheet(
            'QListWidget{background:#1f2937;border:1px solid #374151;border-radius:4px;}'
            'QListWidget::item{padding:5px 8px;border-bottom:1px solid #2d3748;}'
            'QListWidget::item:selected{background:#1e3a5f;}'
            'QListWidget::item:hover{background:#243447;}'
        )
        self._dataset_list.setMaximumHeight(140)
        self._dataset_list.itemSelectionChanged.connect(self._on_dataset_selected)
        lay.addWidget(self._dataset_list)

        # Dataset action buttons — row 1: load layer formats
        ds_row1 = QHBoxLayout()
        self._wfs_btn      = _btn('WFS')
        self._xyz_btn      = _btn('XYZ')
        self._pmtiles_btn  = _btn('PMTiles')
        self._gpkg_btn     = _btn('GPKG')
        for b in [self._wfs_btn, self._xyz_btn, self._pmtiles_btn, self._gpkg_btn]:
            b.setEnabled(False)
            ds_row1.addWidget(b)
        lay.addLayout(ds_row1)

        # Row 2: Schema + Suggest Questions
        ds_row2 = QHBoxLayout()
        self._schema_btn  = _btn('Schema')
        self._suggest_btn = _btn('Suggest Questions')
        for b in [self._schema_btn, self._suggest_btn]:
            b.setEnabled(False)
            ds_row2.addWidget(b)
        lay.addLayout(ds_row2)

        self._wfs_btn.clicked.connect(self._load_wfs)
        self._xyz_btn.clicked.connect(self._load_xyz)
        self._pmtiles_btn.clicked.connect(self._load_pmtiles)
        self._gpkg_btn.clicked.connect(self._download_gpkg)
        self._schema_btn.clicked.connect(self._show_schema)
        self._suggest_btn.clicked.connect(self._show_suggestions)

        self._ds_status = _lbl('', color='#6b7280')
        self._ds_status.setStyleSheet('color:#6b7280;font-size:11px;')
        lay.addWidget(self._ds_status)

        # Dataset info panel (schema / suggestions)
        self._info_panel = QWidget()
        self._info_panel.setVisible(False)
        self._info_panel.setStyleSheet(
            'background:#0d1b2a;border:1px solid #1e3a5f;border-radius:6px;'
        )
        ip_lay = QVBoxLayout(self._info_panel)
        ip_lay.setContentsMargins(10, 8, 10, 8)
        ip_lay.setSpacing(4)

        ip_header = QHBoxLayout()
        self._info_title = QLabel()
        self._info_title.setStyleSheet('color:#4f8ef7;font-weight:bold;font-size:11px;')
        ip_header.addWidget(self._info_title)
        ip_header.addStretch()
        close_ip = QPushButton('✕')
        close_ip.setMaximumWidth(22)
        close_ip.setStyleSheet(
            'QPushButton{background:transparent;border:none;color:#6b7280;font-size:12px;}'
            'QPushButton:hover{color:#e5e7eb;}'
        )
        close_ip.clicked.connect(lambda: self._info_panel.setVisible(False))
        ip_header.addWidget(close_ip)
        ip_lay.addLayout(ip_header)

        self._info_browser = QTextBrowser()
        self._info_browser.setMinimumHeight(100)
        self._info_browser.setMaximumHeight(300)
        self._info_browser.setStyleSheet(
            'background:transparent;border:none;color:#e5e7eb;font-size:13px;'
        )
        self._info_browser.setOpenExternalLinks(False)
        self._info_browser.setOpenLinks(False)   # prevents navigation, fires anchorClicked
        self._info_browser.anchorClicked.connect(self._on_suggestion_clicked)
        ip_lay.addWidget(self._info_browser)

        lay.addWidget(self._info_panel)

        lay.addWidget(_separator())

        # ── SECTION 3: AI Query ───────────────────────────────────────────
        lay.addWidget(_section_label('AI QUERY'))
        lay.addWidget(_lbl('Ask a question about your checked datasets:', color='#6b7280'))

        self._question_edit = QPlainTextEdit()
        self._question_edit.setPlaceholderText(
            'e.g. "Show flood events in Southeast Asia after 2020"'
        )
        self._question_edit.setMaximumHeight(65)
        self._question_edit.setStyleSheet(
            'background:#1f2937;border:1px solid #374151;border-radius:4px;'
            'padding:6px;color:#e5e7eb;'
        )
        lay.addWidget(self._question_edit)

        self._ask_btn = _btn('Ask Scout', primary=True)
        self._ask_btn.setMinimumHeight(34)
        self._ask_btn.setSizePolicy(_Expanding, _Fixed)
        self._ask_btn.clicked.connect(self._ask)
        lay.addWidget(self._ask_btn)

        self._ai_progress = QProgressBar()
        self._ai_progress.setRange(0, 0)
        self._ai_progress.setVisible(False)
        self._ai_progress.setMaximumHeight(3)
        self._ai_progress.setStyleSheet(
            'QProgressBar{background:#1f2937;border:none;border-radius:2px;}'
            'QProgressBar::chunk{background:#4f8ef7;border-radius:2px;}'
        )
        lay.addWidget(self._ai_progress)

        self._answer_browser = QPlainTextEdit()
        self._answer_browser.setReadOnly(True)
        self._answer_browser.setMinimumHeight(80)
        self._answer_browser.setStyleSheet(
            'background:#1f2937;border:1px solid #374151;border-radius:4px;'
            'padding:6px;color:#e5e7eb;'
        )
        self._answer_browser.setPlaceholderText('Answer will appear here…')
        lay.addWidget(self._answer_browser, 1)

        self._sql_box = QGroupBox('SQL  (click to expand)')
        self._sql_box.setCheckable(True)
        self._sql_box.setChecked(False)
        self._sql_box.setStyleSheet(
            'QGroupBox{border:1px solid #374151;border-radius:4px;margin-top:8px;color:#6b7280;}'
            'QGroupBox::title{subcontrol-origin:margin;left:8px;padding:0 4px;}'
        )
        sql_lay = QVBoxLayout(self._sql_box)
        self._sql_label = QLabel()
        self._sql_label.setWordWrap(True)
        self._sql_label.setStyleSheet('color:#86efac;font-family:monospace;font-size:10px;')
        self._sql_label.setTextInteractionFlags(_TextSelectable)
        sql_lay.addWidget(self._sql_label)
        lay.addWidget(self._sql_box)

        self._quota_label = _lbl('', color='#6b7280')
        self._quota_label.setStyleSheet('color:#6b7280;font-size:10px;')
        lay.addWidget(self._quota_label)

        lay.addWidget(_separator())

        lay.addWidget(_lbl('Export AI result:', bold=True))
        exp_row = QHBoxLayout()
        self._load_gpkg_btn      = _btn('Load GPKG', primary=True)
        self._export_parquet_btn = _btn('GeoParquet')
        for b in [self._load_gpkg_btn, self._export_parquet_btn]:
            b.setEnabled(False)
            exp_row.addWidget(b)
        lay.addLayout(exp_row)
        self._load_gpkg_btn.clicked.connect(self._export_gpkg)
        self._export_parquet_btn.clicked.connect(self._export_parquet_ai)

        self._export_status = _lbl('', color='#6b7280')
        self._export_status.setStyleSheet('color:#6b7280;font-size:11px;')
        lay.addWidget(self._export_status)

        lay.addStretch()

        scroll.setWidget(inner)
        outer = QVBoxLayout(w)
        outer.setContentsMargins(0, 0, 0, 0)
        outer.addWidget(scroll)
        return w

    # ── Publish actions ───────────────────────────────────────────────────────

    @pyqtSlot()
    def _run_publish(self):
        if not cfg.token():
            self._pub_status.setText('Sign in first (Account tab).')
            return

        layer = self._layer_combo.currentLayer() if self._layer_combo else None
        if not layer:
            self._pub_status.setText('No layer selected.')
            return

        name = self._pub_name_edit.text().strip()
        if not name:
            # Auto-generate from layer name
            import re as _re
            name = _re.sub(r'[^a-z0-9-]', '-', layer.name().lower()).strip('-')
            self._pub_name_edit.setText(name)
        if not name:
            self._pub_status.setText('Enter a dataset name.')
            return

        max_zoom = self._pub_zoom.value()

        self._publish_btn.setEnabled(False)
        self._pub_progress.setVisible(True)
        self._pub_urls_widget.setVisible(False)
        self._pub_status.setText('Exporting layer…')

        # Use closure to pass progress callback
        progress_cb: list = [None]
        client = self._client()

        def do_work():
            on_prog = lambda msg: progress_cb[0] and progress_cb[0](msg)

            # Step 1: export layer to temp GeoPackage
            on_prog('Exporting layer to GeoPackage…')
            tmp_path = _export_layer_to_gpkg(layer)
            try:
                filename = f'{name}.gpkg'
                # Step 2: get presigned R2 URL (standard JSON POST — no auth issues)
                on_prog('Requesting upload URL…')
                presign = client.presign_upload(filename)
                put_url = presign['putUrl']
                r2_key  = presign['r2Key']
                # Step 3: PUT file directly to R2 (no auth header needed)
                on_prog('Uploading file…')
                client.put_to_r2(put_url, tmp_path)
                # Step 4: trigger Scout ingest pipeline via SSE
                on_prog('Processing…')
                return client.ingest_stream(
                    name, max_zoom,
                    r2_key=r2_key,
                    on_progress=on_prog,
                )
            finally:
                try:
                    os.unlink(tmp_path)
                except Exception:
                    pass

        w = Worker(do_work)
        progress_cb[0] = w.progress.emit
        w.progress.connect(self._on_publish_step)
        w.result.connect(self._on_publish_done)
        w.error.connect(self._on_publish_error)
        w.finished.connect(lambda: self._workers.remove(w) if w in self._workers else None)
        self._workers.append(w)
        w.start()

    @pyqtSlot(str)
    def _on_publish_step(self, msg: str):
        self._pub_status.setText(msg)

    @pyqtSlot(object)
    def _on_publish_done(self, result: dict):
        self._publish_btn.setEnabled(True)
        self._pub_progress.setVisible(False)
        name = result.get('name', self._pub_name_edit.text().strip())
        self._pub_status.setText(f'✓ Published "{name}" successfully.')
        self._pub_status.setStyleSheet('color:#10b981;font-size:11px;')

        base = cfg.base_url()
        import urllib.parse as _up
        n = _up.quote(name)

        urls = {
            'wfs':        f'{base}/api/wfs/{n}',
            'xyz':        f'{base}/api/xyz/{n}/{{z}}/{{x}}/{{y}}',
            'pmtiles':    f'{base}/api/stac/{n}/data.pmtiles',
            'geoparquet': f'{base}/api/stac/{n}/data.parquet',
            'gpkg':       f'{base}/api/stac/{n}/data.gpkg',
            'viewer':     f'{base}/api/stac/{n}/viewer',
        }
        self._pub_name_done.setText(f'✓  {name}')
        for key, url in urls.items():
            if key in self._pub_url_rows:
                self._pub_url_rows[key].setText(url)
                self._pub_url_rows[key].setToolTip(url)

        self._pub_urls_widget.setVisible(True)

        # Refresh catalog so the new dataset appears
        self._connect()

    @pyqtSlot(str)
    def _on_publish_error(self, msg: str):
        self._publish_btn.setEnabled(True)
        self._pub_progress.setVisible(False)
        import re as _re
        clean = _re.sub(r'<[^>]+>', '', msg).strip()
        if len(clean) > 200:
            clean = clean[:200] + '…'
        self._pub_status.setText(f'Publish failed: {clean}')
        self._pub_status.setStyleSheet('color:#ef4444;font-size:11px;')

    # ── Catalog / connect actions ─────────────────────────────────────────────

    @pyqtSlot()
    def _connect(self):
        self._connect_btn.setEnabled(False)
        self._cat_progress.setVisible(True)
        self._ds_status.setText('Loading datasets…')
        self._dataset_list.clear()
        self._datasets.clear()
        self._info_panel.setVisible(False)
        self._run(
            lambda: self._client().catalog(),
            self._on_catalog,
            self._on_connect_error,
        )

    @pyqtSlot(object)
    def _on_catalog(self, catalog: dict):
        self._connect_btn.setEnabled(True)
        self._connect_btn.setVisible(True)
        self._cat_progress.setVisible(False)
        links = [l for l in catalog.get('links', []) if l.get('rel') in ('item', 'child')]

        self._set_connected(True)
        count = len(links)
        self._conn_badge.setText(f'● {count} dataset{"s" if count != 1 else ""}')
        self._conn_badge.setVisible(True)

        if not links:
            self._ds_status.setText('No datasets yet — publish a layer above or ingest at scout.geosolvix.com')
            return

        self._ds_status.setText('Select a dataset to load or query.')
        self._dataset_list.clear()
        self._datasets = []

        for link in links:
            name = link.get('title') or link.get('href', '').split('/')[-2]
            item = QListWidgetItem(f'  {name}')
            item.setData(_UserRole, name)
            item.setForeground(QColor('#e5e7eb'))
            item.setCheckState(_qe(Qt, 'CheckState.Checked', 'Checked'))
            self._dataset_list.addItem(item)
            self._datasets.append({'name': name})

    @pyqtSlot(str)
    def _on_connect_error(self, msg: str):
        self._connect_btn.setEnabled(True)
        self._cat_progress.setVisible(False)
        if '401' in msg or 'unauthorized' in msg.lower():
            self._handle_session_expired()
            return
        self._conn_badge.setVisible(False)
        self._connect_btn.setVisible(False)
        self._ds_status.setText(f'Error loading datasets: {msg}')
        self._set_connected(False)

    def _is_tiles_only(self, name: str) -> bool:
        """Old-style AI filter result datasets (tiles only, no parquet). New ai-filter-{ts} have full data."""
        return name.startswith('ai-filter-result----')

    @pyqtSlot()
    def _on_dataset_selected(self):
        items = self._dataset_list.selectedItems()
        if not items:
            for b in [self._wfs_btn, self._xyz_btn, self._pmtiles_btn, self._gpkg_btn,
                      self._schema_btn, self._suggest_btn]:
                b.setEnabled(False)
            return
        name = items[0].data(_UserRole) or ''
        tiles_only = self._is_tiles_only(name)
        # Old-style tiles-only datasets: only XYZ + PMTiles available
        self._xyz_btn.setEnabled(True)
        self._pmtiles_btn.setEnabled(True)
        self._wfs_btn.setEnabled(not tiles_only)
        self._gpkg_btn.setEnabled(not tiles_only)
        self._schema_btn.setEnabled(not tiles_only)
        self._suggest_btn.setEnabled(not tiles_only)
        if tiles_only:
            self._ds_status.setText('Tiles-only dataset — only XYZ and PMTiles available.')

    def _selected_name(self) -> str:
        items = self._dataset_list.selectedItems()
        return items[0].data(_UserRole) or '' if items else ''

    def _checked_datasets(self) -> list:
        _Checked = _qe(Qt, 'CheckState.Checked', 'Checked')
        names = []
        for i in range(self._dataset_list.count()):
            item = self._dataset_list.item(i)
            if item and item.checkState() == _Checked:
                names.append(item.data(_UserRole))
        return names

    # ── Schema ────────────────────────────────────────────────────────────────

    @pyqtSlot()
    def _show_schema(self):
        name = self._selected_name()
        if not name:
            return
        self._info_title.setText(f'Schema — {name}')
        self._info_browser.setPlainText('Loading schema…')
        self._info_panel.setVisible(True)
        self._run(
            lambda: self._client().schema(name),
            self._on_schema,
            lambda msg: self._info_browser.setPlainText(_clean_err(msg)),
        )

    @pyqtSlot(object)
    def _on_schema(self, data: dict):
        cols = data.get('columns', [])
        if not cols:
            self._info_browser.setPlainText('No schema available.')
            return
        html = '<table style="width:100%;font-size:13px;border-collapse:collapse;">'
        html += '<tr><th style="text-align:left;color:#9ca3af;padding:3px 6px;">Column</th>'
        html += '<th style="text-align:left;color:#9ca3af;padding:3px 6px;">Type</th></tr>'
        for col in cols:
            html += (
                f'<tr><td style="color:#e5e7eb;padding:3px 6px;">{col.get("name","")}</td>'
                f'<td style="color:#86efac;padding:3px 6px;font-family:monospace;">{col.get("type","")}</td></tr>'
            )
        html += '</table>'
        self._info_browser.setHtml(html)

    # ── Suggestions ───────────────────────────────────────────────────────────

    @pyqtSlot()
    def _show_suggestions(self):
        name = self._selected_name()
        if not name:
            return
        self._info_title.setText(f'AI Suggestions — {name}')
        self._info_browser.setPlainText('Generating suggestions…')
        self._info_panel.setVisible(True)
        self._run(
            lambda: self._client().describe(name),
            self._on_suggestions,
            lambda msg: self._info_browser.setPlainText(_clean_err(msg)),
        )

    @pyqtSlot(object)
    def _on_suggestions(self, data: dict):
        desc    = data.get('description', '')
        queries = data.get('suggestions', [])
        name    = self._selected_name()
        labels  = [_sql_to_question(q, name) for q in queries[:4]]

        html  = f'<p style="color:#d1d5db;font-size:13px;line-height:1.5;">{desc}</p>'
        html += '<p style="color:#9ca3af;font-size:12px;margin-top:10px;font-weight:bold;">Click a question to explore:</p>'
        for i, (label, sql) in enumerate(zip(labels, queries[:4]), 1):
            html += (
                f'<p style="margin:8px 0;padding:6px 8px;background:#1a2d44;border-radius:4px;">'
                f'<a href="sql:{i}" style="color:#60a5fa;font-size:13px;text-decoration:none;">'
                f'{label}</a></p>'
            )
        self._info_browser.setHtml(html)
        self._cached_suggestions = queries
        self._cached_suggestion_labels = labels

    def _on_suggestion_clicked(self, url):
        href = url.toString() if hasattr(url, 'toString') else str(url)
        if href.startswith('sql:'):
            try:
                idx = int(href[4:]) - 1
                labels = getattr(self, '_cached_suggestion_labels', [])
                if 0 <= idx < len(labels):
                    # Put the English question in the question field for the user to ask
                    self._question_edit.setPlainText(labels[idx])
                    self._tabs.setCurrentIndex(1)  # stay on AI Catalog tab
                    # Scroll to AI query section
            except (ValueError, IndexError):
                pass

    # ── Dataset load actions ──────────────────────────────────────────────────

    @pyqtSlot()
    def _load_wfs(self):
        name = self._selected_name()
        if not name:
            return
        self._add_wfs_from_url(self._client().wfs_url(name), name)

    def _add_wfs_from_url(self, wfs_url: str, name: str = ''):
        if not wfs_url:
            return
        if not name:
            name = wfs_url.rstrip('/').split('/')[-1]
        # Use typename so QGIS knows exactly which feature type to fetch.
        # Do NOT use restrictToRequestBBOX — it sends corrupted BBOX coordinates.
        import re as _re
        xml_name = _re.sub(r'[^a-zA-Z0-9._-]', '_', name)
        if not _re.match(r'^[a-zA-Z_]', xml_name):
            xml_name = f'_{xml_name}'
        uri = (
            f"url='{wfs_url}' version='2.0.0' "
            f"typename='scout:{xml_name}' "
            f"srsname='urn:ogc:def:crs:OGC:1.3:CRS84'"
        )
        layer = QgsVectorLayer(uri, name, 'WFS')
        if layer.isValid():
            QgsProject.instance().addMapLayer(layer)
            self.iface.messageBar().pushSuccess('Scout', f'WFS layer "{name}" loaded.')
        else:
            self.iface.messageBar().pushCritical('Scout', f'Failed to load WFS "{name}".')

    @pyqtSlot()
    def _load_xyz(self):
        name = self._selected_name()
        if not name:
            return
        # TileJSON URL avoids {z}/{x}/{y} brace-encoding issues in QGIS
        self._add_xyz_from_url(self._client().tilejson_url(name), name)

    def _add_xyz_from_url(self, url: str, name: str = ''):
        """
        Load XYZ/vector-tile layer. Accepts TileJSON URL or raw {z}/{x}/{y} template URL.
        Falls back to direct tile template if TileJSON is unavailable (e.g. old datasets).
        """
        if not url:
            return
        if not name:
            parts = url.rstrip('/').split('/')
            try:
                idx = parts.index('xyz')
                name = urllib.parse.unquote(parts[idx + 1]) if len(parts) > idx + 1 else 'tiles'
            except ValueError:
                name = 'tiles'
        if _HAS_VECTOR_TILES:
            # QgsVectorTileLayer.isValid() is unreliable for remote layers — add unconditionally.
            layer = QgsVectorTileLayer(f'type=xyz&url={url}', name)
            QgsProject.instance().addMapLayer(layer)
            self.iface.setActiveLayer(layer)
            self.iface.zoomToActiveLayer()
            self.iface.messageBar().pushSuccess('Scout', f'Vector tiles "{name}" loaded.')
            return
        self.iface.messageBar().pushCritical(
            'Scout', f'Failed to load "{name}". Requires QGIS 3.14+ with vector tile support.'
        )

    @pyqtSlot()
    def _load_pmtiles(self):
        name = self._selected_name()
        if not name:
            return
        if not _HAS_VECTOR_TILES:
            self.iface.messageBar().pushCritical('Scout', 'Requires QGIS 3.14+ with vector tile support.')
            return
        self._ds_status.setText(f'Loading {name}.pmtiles…')
        self._pmtiles_btn.setEnabled(False)
        self._cat_progress.setVisible(True)
        client = self._client()
        self._run(
            lambda: client.download_pmtiles(name),
            lambda data: self._on_pmtiles_downloaded(data, name),
            lambda msg: self._on_pmtiles_error(msg),
        )

    def _on_pmtiles_downloaded(self, data: bytes, name: str):
        self._cat_progress.setVisible(False)
        self._pmtiles_btn.setEnabled(True)
        tmp = os.path.join(tempfile.gettempdir(), f'scout_{name}.pmtiles')
        with open(tmp, 'wb') as f:
            f.write(data)
        # QGIS loads PMTiles via the OGR provider: /path/to/file.pmtiles|layername={name}
        layer = QgsVectorLayer(f'{tmp}|layername={name}', name, 'ogr')
        if layer.isValid():
            QgsProject.instance().addMapLayer(layer)
            self.iface.setActiveLayer(layer)
            self.iface.zoomToActiveLayer()
            self._ds_status.setText(f'"{name}" loaded.')
            self.iface.messageBar().pushSuccess('Scout', f'PMTiles "{name}" loaded.')
        else:
            self._ds_status.setText('PMTiles downloaded but failed to load.')

    def _on_pmtiles_error(self, msg: str):
        self._cat_progress.setVisible(False)
        self._pmtiles_btn.setEnabled(True)
        self._ds_status.setText(f'PMTiles failed: {_clean_err(msg)}')

    def _load_pmtiles_from_url(self, url: str):
        """Download PMTiles from a full URL (published panel) and load via OGR."""
        if not url:
            return
        segments = url.rstrip('/').split('/')
        name = urllib.parse.unquote(segments[-2]) if len(segments) >= 2 else 'dataset'
        base = cfg.base_url()
        path = url[len(base):] if url.startswith(base) else url
        self._pub_status.setText(f'Loading {name}.pmtiles…')
        client = self._client()
        self._run(
            lambda: client._get_binary(path),
            lambda data: self._on_pmtiles_downloaded(data, name),
            lambda msg: self._pub_status.setText(f'PMTiles failed: {_clean_err(msg)}'),
        )

    @pyqtSlot(object)
    def _on_parquet_layer(self, data: bytes, name: str):
        """Shared handler: save parquet bytes to temp file and load as QGIS layer."""
        tmp = os.path.join(tempfile.gettempdir(), f'scout_{name}.parquet')
        with open(tmp, 'wb') as f:
            f.write(data)
        layer = QgsVectorLayer(tmp, name, 'ogr')
        if layer.isValid():
            QgsProject.instance().addMapLayer(layer)
            self.iface.messageBar().pushSuccess('Scout', f'"{name}" loaded as GeoParquet layer.')
        else:
            self.iface.messageBar().pushWarning(
                'Scout', 'GeoParquet downloaded but could not load — requires GDAL with Parquet/Arrow support.'
            )

    def _load_parquet_from_url(self, url: str):
        """Download GeoParquet from a URL (with auth) and load as QGIS layer."""
        if not url:
            return
        # name is the path segment before 'data.parquet': /api/stac/{name}/data.parquet
        segments = url.rstrip('/').split('/')
        name = urllib.parse.unquote(segments[-2]) if len(segments) >= 2 else 'dataset'
        base = cfg.base_url()
        path = url[len(base):] if url.startswith(base) else url
        self._pub_status.setText(f'Downloading {name}.parquet…')
        client = self._client()
        self._run(
            lambda: client._get_binary(path),
            lambda data: self._on_parquet_layer(data, name),
            lambda msg: self._pub_status.setText(f'GeoParquet failed: {_clean_err(msg)}'),
        )

    def _load_gpkg_from_url(self, url: str):
        """Download GeoPackage from a URL (with auth) and load as QGIS layer."""
        if not url:
            return
        segments = url.rstrip('/').split('/')
        name = urllib.parse.unquote(segments[-2]) if len(segments) >= 2 else 'dataset'
        base = cfg.base_url()
        path = url[len(base):] if url.startswith(base) else url
        self._pub_status.setText(f'Downloading {name}.gpkg…')
        client = self._client()
        self._run(
            lambda: client._get_binary(path),
            lambda data: self._on_gpkg_downloaded(data, name),
            lambda msg: self._pub_status.setText(f'GPKG failed: {_clean_err(msg)}'),
        )

    @pyqtSlot()
    def _download_gpkg(self):
        name = self._selected_name()
        if not name:
            return
        self._ds_status.setText(f'Downloading {name}.gpkg…')
        self._cat_progress.setVisible(True)
        self._gpkg_btn.setEnabled(False)
        self._run(
            lambda: self._client().download_gpkg(name),
            lambda data: self._on_gpkg_downloaded(data, name),
            lambda msg: self._on_gpkg_error(msg),
        )

    @pyqtSlot(object)
    def _on_gpkg_downloaded(self, data: bytes, name: str):
        self._cat_progress.setVisible(False)
        self._gpkg_btn.setEnabled(True)
        tmp = os.path.join(tempfile.gettempdir(), f'scout_{name}.gpkg')
        with open(tmp, 'wb') as f:
            f.write(data)
        layer = QgsVectorLayer(tmp, name, 'ogr')
        if layer.isValid():
            QgsProject.instance().addMapLayer(layer)
            self._ds_status.setText(f'"{name}" loaded.')
            self.iface.messageBar().pushSuccess('Scout', f'"{name}" loaded.')
        else:
            self._ds_status.setText('GPKG downloaded but failed to load.')

    @pyqtSlot(str)
    def _on_gpkg_error(self, msg: str):
        self._cat_progress.setVisible(False)
        self._gpkg_btn.setEnabled(True)
        self._ds_status.setText(f'GPKG failed: {msg}')

    # ── AI query actions ──────────────────────────────────────────────────────

    @pyqtSlot()
    def _ask(self):
        question = self._question_edit.toPlainText().strip()
        if not question:
            self.iface.messageBar().pushWarning('Scout', 'Enter a question first.')
            return
        datasets = self._checked_datasets()
        if not datasets:
            self._answer_browser.setPlainText(
                'No datasets checked. Publish a layer first (top of this tab), '
                'then check the datasets you want to query.'
            )
            return
        if not cfg.token():
            self.iface.messageBar().pushWarning('Scout', 'Sign in via the Account tab first.')
            return

        self._ask_btn.setEnabled(False)
        self._ai_progress.setVisible(True)
        self._answer_browser.setPlainText('Thinking…')
        self._sql_label.setText('')
        self._last_sql = ''
        for b in [self._load_gpkg_btn, self._export_parquet_btn]:
            b.setEnabled(False)

        client = self._client()
        self._run(
            lambda: client.ai_ask(question, datasets),
            self._on_ask_result,
            self._on_ask_error,
        )
        self._last_question = question

    @pyqtSlot(object)
    def _on_ask_result(self, data: dict):
        self._ask_btn.setEnabled(True)
        self._ai_progress.setVisible(False)

        answer  = data.get('answer', '')
        sql     = data.get('sql', '')
        count   = data.get('result_count', 0)
        caveats = data.get('caveats', '')
        rows    = data.get('rows', [])
        cols    = data.get('columns', [])

        lines = []
        if answer:
            lines.append(answer)
        if caveats:
            lines.append(f'⚠ {caveats}')
        lines.append(f'{count:,} feature(s) matched.')
        self._answer_browser.setPlainText('\n\n'.join(lines))

        if sql:
            self._last_sql = sql
            self._sql_label.setText(sql)
            for b in [self._load_gpkg_btn, self._export_parquet_btn]:
                b.setEnabled(True)

        plan = PLAN_LIMITS.get(data.get('plan', 'free'), PLAN_LIMITS['free'])
        ai_limit = plan['ai']
        self._quota_label.setText(
            f'Plan: {plan["label"]}  ·  AI queries: {"∞" if ai_limit is None else ai_limit}/month'
        )

    @pyqtSlot(str)
    def _on_ask_error(self, msg: str):
        self._ask_btn.setEnabled(True)
        self._ai_progress.setVisible(False)
        if '401' in msg or 'unauthorized' in msg.lower():
            self._handle_session_expired()
            return
        if '403' in msg or 'quota' in msg.lower():
            self._answer_browser.setPlainText(
                'AI quota reached for your plan.\nSwitch to the Plans tab to upgrade.'
            )
        elif 'GROUP BY *' in msg or 'group by *' in msg.lower():
            self._answer_browser.setPlainText(
                'Could not run that question — the generated SQL used GROUP BY * which '
                'DuckDB does not support.\n\n'
                'Try rephrasing:\n'
                '  "How many X fall within each Y?"\n'
                '  "Count X grouped by Y"\n'
                '  "List all X where Y equals Z"'
            )
        else:
            self._answer_browser.setPlainText(f'Error: {msg}')

    # ── Export actions ────────────────────────────────────────────────────────

    @pyqtSlot()
    def _export_gpkg(self):
        if not self._last_sql:
            return
        self._export_status.setText('Exporting GeoPackage…')
        self._load_gpkg_btn.setEnabled(False)
        sql = self._last_sql
        question = self._last_question
        self._run(
            lambda: self._client().export_gpkg(sql),
            lambda data: self._on_gpkg_result(data, question),
            lambda msg: self._on_export_error(msg),
        )

    @pyqtSlot(object)
    def _on_gpkg_result(self, data: bytes, question: str):
        self._load_gpkg_btn.setEnabled(True)
        safe = ''.join(c if c.isalnum() or c in '-_ ' else '_' for c in question)[:40]
        tmp = os.path.join(tempfile.gettempdir(), f'scout_ai_{safe}.gpkg')
        with open(tmp, 'wb') as f:
            f.write(data)
        layer = QgsVectorLayer(tmp, safe or 'AI Result', 'ogr')
        if layer.isValid():
            QgsProject.instance().addMapLayer(layer)
            self._export_status.setText('Layer loaded on map.')
            self.iface.messageBar().pushSuccess('Scout', 'AI result loaded as GPKG layer.')
        else:
            self._export_status.setText('GPKG saved but failed to load.')

    @pyqtSlot()
    def _export_parquet_ai(self):
        if not self._last_sql:
            return
        self._export_status.setText('Exporting GeoParquet…')
        self._export_parquet_btn.setEnabled(False)
        sql = self._last_sql
        question = self._last_question
        self._run(
            lambda: self._client().export_parquet(sql),
            lambda data: self._on_parquet_ai_result(data, question),
            lambda msg: self._on_export_error(msg),
        )

    @pyqtSlot(object)
    def _on_parquet_ai_result(self, data: bytes, question: str):
        self._export_parquet_btn.setEnabled(True)
        safe = ''.join(c if c.isalnum() or c in '-_ ' else '_' for c in question)[:40]
        tmp = os.path.join(tempfile.gettempdir(), f'scout_ai_{safe}.parquet')
        with open(tmp, 'wb') as f:
            f.write(data)
        layer = QgsVectorLayer(tmp, safe or 'AI Result', 'ogr')
        if layer.isValid():
            QgsProject.instance().addMapLayer(layer)
            self.iface.setActiveLayer(layer)
            self.iface.zoomToActiveLayer()
            self._export_status.setText('GeoParquet layer loaded on map.')
            self.iface.messageBar().pushSuccess('Scout', 'AI result loaded as GeoParquet layer.')
        else:
            self._export_status.setText(
                'GeoParquet saved but could not load — requires GDAL with Parquet/Arrow support.'
            )

    @pyqtSlot(str)
    def _on_export_error(self, msg: str):
        for b in [self._load_gpkg_btn, self._export_parquet_btn]:
            b.setEnabled(bool(self._last_sql))
        self._export_status.setText(f'Export failed: {_clean_err(msg)}')

    # =========================================================================
    # TAB 2 — Plans
    # =========================================================================

    def _build_plans_tab(self) -> QWidget:
        w = QWidget()
        scroll = QScrollArea()
        scroll.setWidgetResizable(True)
        scroll.setStyleSheet('QScrollArea{border:none;background:transparent;}')

        inner = QWidget()
        lay = QVBoxLayout(inner)
        lay.setContentsMargins(12, 12, 12, 12)
        lay.setSpacing(12)

        lay.addWidget(_lbl('Scout Plans', bold=True))

        plans = [
            ('Free',         '$0',     ['10 datasets', '5 AI queries/month', '1 GB storage', 'XYZ + PMTiles + STAC', 'Watermark on embeds'], '#6b7280'),
            ('Solo',         '$9/mo',  ['60 datasets', '40 AI queries/month', '10 GB storage', 'No watermark', 'Full job history'], '#3b82f6'),
            ('Professional', '$39/mo', ['600 datasets', '400 AI queries/month', '50 GB storage', 'Private STAC catalogs', 'Priority support'], '#8b5cf6'),
            ('Enterprise',   'Custom', ['Unlimited everything', 'BYO R2 / S3', 'Self-hosted option', 'Custom domain', 'SLA + dedicated support'], '#f59e0b'),
        ]
        for name, price, features, color in plans:
            card = QWidget()
            card.setStyleSheet(
                f'background:#1f2937;border:1px solid #374151;'
                f'border-top:2px solid {color};border-radius:0 0 6px 6px;'
            )
            cl = QVBoxLayout(card)
            cl.setContentsMargins(10, 8, 10, 8)
            cl.setSpacing(3)
            header_row = QHBoxLayout()
            n_lbl = QLabel(name)
            n_lbl.setStyleSheet(f'color:{color};font-weight:bold;font-size:12px;')
            header_row.addWidget(n_lbl)
            header_row.addStretch()
            p_lbl = QLabel(price)
            p_lbl.setStyleSheet('color:#e5e7eb;font-size:12px;font-weight:bold;')
            header_row.addWidget(p_lbl)
            cl.addLayout(header_row)
            for feat in features:
                fl = QLabel(f'· {feat}')
                fl.setStyleSheet('color:#9ca3af;font-size:11px;')
                cl.addWidget(fl)
            lay.addWidget(card)

        lay.addWidget(_separator())

        upgrade_btn = _btn('View Pricing & Upgrade →', primary=True)
        upgrade_btn.setSizePolicy(_Expanding, _Fixed)
        upgrade_btn.clicked.connect(lambda: webbrowser.open('https://scout.geosolvix.com/#pricing'))
        lay.addWidget(upgrade_btn)

        demo_btn = _btn('Request Enterprise Demo')
        demo_btn.setSizePolicy(_Expanding, _Fixed)
        demo_btn.clicked.connect(lambda: webbrowser.open('https://scout.geosolvix.com/#pricing'))
        lay.addWidget(demo_btn)

        lay.addStretch()

        scroll.setWidget(inner)
        outer = QVBoxLayout(w)
        outer.setContentsMargins(0, 0, 0, 0)
        outer.addWidget(scroll)
        return w


# ── Layer export helper ───────────────────────────────────────────────────────

def _export_layer_to_gpkg(layer) -> str:
    """Export a QGIS vector layer to a temp GeoPackage. Returns path."""
    import os as _os

    if layer.featureCount() == 0:
        raise RuntimeError('Layer has no features to export.')

    tmp = tempfile.NamedTemporaryFile(suffix='.gpkg', delete=False)
    tmp_path = tmp.name
    tmp.close()
    # Remove the empty file — GDAL creates it fresh
    try:
        _os.unlink(tmp_path)
    except OSError:
        pass

    crs_4326 = QgsCoordinateReferenceSystem('EPSG:4326')
    opts = QgsVectorFileWriter.SaveVectorOptions()
    opts.driverName = 'GPKG'
    opts.fileEncoding = 'UTF-8'

    # Only set CRS transform if the layer is NOT already EPSG:4326
    src_authid = layer.crs().authid()
    if src_authid not in ('EPSG:4326', 'OGC:CRS84', 'CRS:84'):
        opts.ct = QgsCoordinateTransform(
            layer.crs(), crs_4326, QgsProject.instance()
        )

    err, msg, _, _ = QgsVectorFileWriter.writeAsVectorFormatV3(
        layer, tmp_path, QgsProject.instance().transformContext(), opts
    )

    if err != 0:
        raise RuntimeError(f'Layer export failed (code {err}): {msg}')

    size = _os.path.getsize(tmp_path) if _os.path.exists(tmp_path) else 0
    if size < 100:
        raise RuntimeError(f'Exported file is empty ({size} bytes). Check layer CRS and features.')

    return tmp_path



# ── Error helper ─────────────────────────────────────────────────────────────

def _clean_err(msg: str) -> str:
    """Strip HTML from error messages and truncate."""
    import re as _re
    clean = _re.sub(r'<[^>]+>', '', msg).strip()
    if len(clean) > 200:
        clean = clean[:200] + '…'
    return f'Error: {clean}'


# ── SQL → English question transformer ────────────────────────────────────────

def _sql_to_question(sql: str, dataset_name: str) -> str:
    """Convert a DuckDB SQL suggestion into a readable English question."""
    import re as _re
    sql_up = sql.upper()

    # Top N by column: ORDER BY x DESC LIMIT N
    m = _re.search(r'ORDER\s+BY\s+(.+?)\s+DESC\s+LIMIT\s+(\d+)', sql, _re.IGNORECASE)
    if m:
        raw_col = m.group(1).strip()
        # Extract alias: "expr AS alias" → alias
        alias_m = _re.search(r'\bAS\s+(\w+)\s*$', raw_col, _re.IGNORECASE)
        col = alias_m.group(1) if alias_m else raw_col.split('.')[-1].strip('" ')
        n = m.group(2)
        return f'What are the top {n} features by {col}?'

    # WHERE filter
    m = _re.search(r'\bWHERE\b\s+(.+?)(?:\s+ORDER\s+BY|\s+LIMIT|\s+GROUP\s+BY|$)',
                   sql, _re.IGNORECASE | _re.DOTALL)
    if m:
        cond = m.group(1).strip()
        cond = _re.sub(r"read_parquet\('[^']*'\)\.", '', cond)
        cond = _re.sub(r'\s+', ' ', cond)[:70].rstrip()
        return f'Show features where {cond}'

    # GROUP BY
    m = _re.search(r'\bGROUP\s+BY\s+(.+?)(?:\s+ORDER|\s+LIMIT|$)', sql, _re.IGNORECASE)
    if m:
        col = m.group(1).strip().strip('"')[:40]
        return f'Summarize {dataset_name} grouped by {col}'

    # Spatial functions
    if 'ST_AREA' in sql_up:
        return f'Which {dataset_name} features have the largest area?'
    if 'ST_DISTANCE' in sql_up:
        return f'Find nearest {dataset_name} features by distance'
    if 'ST_CENTROID' in sql_up:
        return f'Show centroids of {dataset_name} features'
    if 'ST_BUFFER' in sql_up:
        return f'Find features within a buffer distance in {dataset_name}'
    if 'COUNT(' in sql_up:
        return f'How many features are in {dataset_name}?'

    return f'Explore {dataset_name} data'


