"""
Persistent settings for the Scout plugin, stored via QgsSettings.
"""

from qgis.core import QgsSettings

_NS = 'scout_plugin'

DEFAULTS = {
    'base_url': 'https://scout.geosolvix.com',
    'token':    '',  # nosec B105 — empty default, not a hardcoded credential
}


def get(key: str) -> str:
    s = QgsSettings()
    return s.value(f'{_NS}/{key}', DEFAULTS.get(key, ''), type=str)


def set(key: str, value: str) -> None:
    s = QgsSettings()
    s.setValue(f'{_NS}/{key}', value)


def base_url() -> str:
    return get('base_url')


def token() -> str:
    return get('token')


def set_base_url(url: str) -> None:
    set('base_url', url.rstrip('/'))


def set_token(tok: str) -> None:
    set('token', tok.strip())


def clear_token() -> None:
    set('token', '')


def email() -> str:
    return get('email')


def set_email(e: str) -> None:
    set('email', e.strip().lower())
