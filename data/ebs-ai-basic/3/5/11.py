# step1 활성화 함수 g를 출력하기

import numpy as np
import matplotlib.pyplot as plt


def Step(x):
    return np.array(x > 0, dtype=np.int)  # 조건에 따라 참/거짓, 1/0의 값을 반환


def ReLU(x):
    # 0과 매개변수 x에 입력된 값 중에 큰 값을 반환. 인자의 값이 0보다 작을 경우는 항상 0, 0보다 클 경우는 입력된 값이 반환
    return np.maximum(0, x)


x = np.arange(-5.0, 5.0, 0.1)  # np.arange의 인자는 시작, 종료, 간격을 입력
y = ReLU(x)
plt.plot(x, y)
plt.grid()
plt.show()
