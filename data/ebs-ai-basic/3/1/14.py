# step1 데이터 불러오기

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
print(C_old)
print(flag)
