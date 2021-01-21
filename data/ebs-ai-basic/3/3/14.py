# step1 데이터를 학습(train), 평가(test) 데이터로 분리하기

import matplotlib.pyplot as plt
import numpy as np
import pandas as pd

df = pd.read_csv('temp_ice.csv', encoding='euc-kr')

data = np.array(df)

X = data[:, 1]
Y = data[:, -1]

# step2 비용을 계산하고 업데이트하기

# 입력 변수와 출력 변수 각각의 평균(mean) 구하기
mean_x = np.mean(X)
mean_y = np.mean(Y)

# X변수의 개수 구하기
n = len(X)

# 최소제곱법을 이용하여 beta0과 beta1 구하기

temp1 = 0
temp2 = 0

for i in range(n):
    temp1 += (X[i] - mean_x) * (Y[i] - mean_y)
    temp2 += (X[i] - mean_x) ** 2

beta1 = temp1 / temp2
beta0 = mean_y - (beta1 * mean_x)


def Regression(beta0, beta1, X):
    y_pred = beta0 + beta1 * X
    return y_pred


my_temp = float(input('안녕하세요. 오늘의 평균 기온을 입력해주세요. :'))
predicted_value = Regression(beta0, beta1, my_temp)
print('아이스크림 쇼핑 클릭량은 100점을 기준으로 {0} 만큼 예상됩니다'.format(predicted_value))
