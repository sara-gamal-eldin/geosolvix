import os
from qgis.PyQt.QtWidgets import QAction
from qgis.PyQt.QtGui import QIcon
from qgis.PyQt.QtCore import Qt

# Qt5/Qt6 enum compatibility
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

_RightDock = _qe(Qt, 'DockWidgetArea.RightDockWidgetArea', 'RightDockWidgetArea')


class ScoutPlugin:
    def __init__(self, iface):
        self.iface = iface
        self.dock = None
        self.action = None

    def initGui(self):
        from .dock_widget import ScoutDockWidget

        icon_path = os.path.join(os.path.dirname(__file__), 'icons', 'scout.png')
        self.action = QAction(QIcon(icon_path), 'Scout', self.iface.mainWindow())
        self.action.setCheckable(True)
        self.action.setToolTip('Open Scout — AI Geospatial Catalog')
        self.action.triggered.connect(self._toggle)
        self.iface.addToolBarIcon(self.action)

        self.dock = ScoutDockWidget(self.iface)
        self.iface.mainWindow().addDockWidget(_RightDock, self.dock)
        self.dock.visibilityChanged.connect(self.action.setChecked)

    def _toggle(self, checked):
        if self.dock:
            self.dock.setVisible(checked)

    def unload(self):
        if self.action:
            self.iface.removeToolBarIcon(self.action)
            self.action.deleteLater()
        if self.dock:
            self.iface.mainWindow().removeDockWidget(self.dock)
            self.dock.deleteLater()
        self.dock = None
        self.action = None
