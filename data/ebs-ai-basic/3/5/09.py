# step1 활성화 함수 g를 출력하기

import numpy as np
import matplotlib.pyplot as plt


def Step(x):
    return np.array(x > 0, dtype=np.int)  # 조건에 따라 참/거짓, 1/0의 값을 반환


x = np.arange(-10.0, 10.0, 0.1)  # np.arange의 인자는 시작, 종료, 간격을 입력
y = Step(x)
plt.plot(x, y)
plt.grid()
plt.show()
