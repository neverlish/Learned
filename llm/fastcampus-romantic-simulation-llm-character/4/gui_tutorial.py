import sys
import os
from PyQt5 import QtCore
from PyQt5.QtWidgets import (
    QApplication,
    QLabel,
    QMainWindow,
    QVBoxLayout,
    QLineEdit,
    QPushButton,
    QWidget,
    QHBoxLayout,
)
from PyQt5.QtGui import QMovie
from PyQt5.QtCore import QTimer

class MainWindow(QMainWindow):

    def __init__(self, *args, **kwargs):
        super(MainWindow, self).__init__(*args, **kwargs)
        self.initUI()

    def initUI(self):
        self.resize(600, 600)
        self.central_widget = QWidget()
        self.setCentralWidget(self.central_widget)
        self.layout = QVBoxLayout(self.central_widget)

        # 캐릭터 GIF 를 위한 QLabel 설정
        scriptDir = os.path.dirname(os.path.realpath(__file__))
        gifFile = os.path.join(scriptDir, "detective-conan-conan-edogawa.gif")
        self.MovieLabel = QLabel(self)
        self.MovieLabel.setGeometry(QtCore.QRect(0, 0, 600, 400))
        # 재생되도록 설정
        self.movie = QMovie(gifFile)
        self.MovieLabel.setMovie(self.movie)
        self.movie.start()
        self.layout.addWidget(self.MovieLabel)

        ## 텍스트 입력 & 전송 버튼
        self.bottom_layout = QHBoxLayout()
        self.text_input = QLineEdit(self)
        self.text_input.setPlaceholderText("메시지를 입력하세요...")
        self.send_button = QPushButton("전송", self)
        self.bottom_layout.addWidget(self.text_input)
        self.bottom_layout.addWidget(self.send_button)

        self.layout.addLayout(self.bottom_layout)


if __name__ == "__main__":
    app = QApplication(sys.argv)
    window = MainWindow()
    window.show()
    sys.exit(app.exec_())
    # print(get_openai_response("안녕하세요."))
    # synthesize_speech("안녕하세요")
