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
from concurrent.futures import ThreadPoolExecutor

from openai import OpenAI

# api key 등록되어 있음.
client = OpenAI()


# chat api - > chat assistant
def get_openai_response(user_message):
    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {"role": "system", "content": "You are a helpful assistant."},
            {"role": "user", "content": user_message},
        ],
    )
    return response.choices[0].message.content


class MainWindow(QMainWindow):

    def __init__(self, *args, **kwargs):
        super(MainWindow, self).__init__(*args, **kwargs)
        self.initUI()
        self.executor = ThreadPoolExecutor(max_workers=1)

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
        self.text_input.returnPressed.connect(self.send_message)
        self.send_button = QPushButton("전송", self)
        self.bottom_layout.addWidget(self.text_input)
        self.bottom_layout.addWidget(self.send_button)

        self.layout.addLayout(self.bottom_layout)

        # 응답 메시지를 표시할 QLabel
        self.response_label = QLabel("", self)
        self.response_label.setAlignment(QtCore.Qt.AlignCenter)
        self.layout.addWidget(self.response_label)

    @QtCore.pyqtSlot(str)
    def display_response(self, text):
        self.response_label.setText(text)
        QTimer.singleShot(10000, self.clear_response)

    @QtCore.pyqtSlot()
    def clear_response(self):
        self.response_label.clear()

    def send_message(self):
        user_text = self.text_input.text()
        if user_text:
            self.text_input.clear()
            self.executor.submit(
                self.get_response, user_text
            )  # 비동기로 get response 실행

    def get_response(self, user_text):
        try:
            answer = get_openai_response(user_text)
            QtCore.QMetaObject.invokeMethod(
                self,
                "display_response",
                QtCore.Qt.QueuedConnection,
                QtCore.Q_ARG(str, answer),
            )
        except Exception as e:
            QtCore.QMetaObject.invokeMethod(
                self,
                "display_response",
                QtCore.Qt.QueuedConnection,
                QtCore.Q_ARG(str, f"Error: {str(e)}"),
            )


if __name__ == "__main__":
    app = QApplication(sys.argv)
    window = MainWindow()
    window.show()
    sys.exit(app.exec_())
    # print(get_openai_response("안녕하세요."))
    # synthesize_speech("안녕하세요")
