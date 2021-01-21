import numpy as np
import pandas as pd

df_train = pd.read_csv('fashion-mnist_train.csv')
df_test = pd.read_csv('fashion-mnist_test.csv')

# step1 각 데이터 프레임의 값을 배열에 저장하기

data_train = np.array(df_train, dtype=np.float32)
x_train = data_train[:, 1:]
y_train = data_train[:, 0]

data_test = np.array(df_test, dtype=np.float32)
x_test = data_test[:, 1:]
y_test = data_test[:, 0]

# step2 훈련 데이터와 테스트 데이터 출력하기
print(df_test)
print(df_train)
