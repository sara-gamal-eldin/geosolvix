"""
Generic QThread worker — keeps all HTTP calls off the main QGIS thread.

Usage:
    w = Worker(lambda: client.ai_ask(question, datasets))
    w.result.connect(on_result)
    w.error.connect(on_error)
    w.start()
"""

from qgis.PyQt.QtCore import QThread, pyqtSignal
from typing import Callable, Any


class Worker(QThread):
    result  = pyqtSignal(object)   # emits whatever the callable returns
    error   = pyqtSignal(str)      # emits error message string
    progress = pyqtSignal(str)     # optional status updates

    def __init__(self, fn: Callable[[], Any], parent=None):
        super().__init__(parent)
        self._fn = fn
        self._running = True

    def run(self):
        try:
            data = self._fn()
            if self._running:
                self.result.emit(data)
        except Exception as e:
            if self._running:
                self.error.emit(str(e))

    def stop(self):
        self._running = False
        self.quit()
        self.wait(3000)
