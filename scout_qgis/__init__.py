def classFactory(iface):
    from .scout_plugin import ScoutPlugin
    return ScoutPlugin(iface)
