# step1 데이터 불러오기

import matplotlib.pyplot as plt
from copy import deepcopy
import numpy as np
import pandas as pd

fifa2019 = pd.read_csv('fifa2019.csv')

df = pd.DataFrame.copy(fifa2019.sort_values(
    by='Overall', ascending=False).head(200))

test_features = ['Name', 'Stamina', 'Dribbling', 'ShortPassing', 'Penalties']

test_df = pd.DataFrame(df, columns=test_features)

# step2 학습 데이터 준비하기

XY = np.array(test_df)
X = XY[:, 1:3]

# step3 K-평균 군집화 알고리즘 적용하기
# 1단계 표본공간에 k개의 중심을 무작위로 생성하기
k = 3
C_x = np.random.choice(X[:, 0], k)
C_y = np.random.choice(X[:, 1], k)
C = np.array(list(zip(C_x, C_y)))

# 2단계 각 표본에 가까운 중심에 할당하기
# 유클라디안 거리 계산 함수 만들기


def Distance(A, B):
    return np.sqrt(np.sum(np.power((A-B), 2)))


C_old = np.zeros(C.shape)
clusters = np.zeros(len(X))
flag = Distance(C, C_old)

# 3단계 각 군집의 중심을 새롭게 계산하기

distances = []

while flag != 0:
    for i in range(len(X)):
        for j in range(3):
            temp = Distance(X[i], C[j])
            distances.append(temp)
        cluster = np.argmin(distances)
        clusters[i] = cluster
        distances = []

    C_old = deepcopy(C)

    for i in range(k):
        points = [X[j] for j in range(len(X)) if clusters[j] == i]
        C[i] = np.mean(points)

    flag = Distance(C, C_old)

# 문제 해결하기


# 1번 군집
plt.scatter(X[clusters == 0, 0], X[clusters == 0, 1], s=50,
            c='red', marker='o', edgecolor='black', label='A')

# 2번 군집
plt.scatter(X[clusters == 1, 0], X[clusters == 1, 1], s=50,
            c='yellow', marker='x', edgecolor='black', label='B')

# 3번 군집
plt.scatter(X[clusters == 2, 0], X[clusters == 2, 1], s=50,
            c='blue', marker='^', edgecolor='black', label='C')

# 군집의 중심 좌표들
plt.scatter(C[:, 0], C[:, 1], s=250, marker='*', c='black',
            edgecolor='black', label='Centroids')
plt.legend()
plt.grid()
plt.show()
