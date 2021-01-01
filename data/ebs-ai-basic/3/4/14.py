# 1 학습 데이터터 추출하기

# step1 입력 변수와 출력 변수 생성하기

import matplotlib.pyplot as plt
import csv
import librosa
import librosa.display
import numpy as np

X_train = np.zeros((40, 20))
y_train = np.zeros(40)

# 인덱스 번호 0~19번까지는 레이블 1(배고픔), 21~40번까지는 레이블 0(웃음)
y_train[0:20] = 1

# step2 소리 데이터의 특성 추출하기

for i in range(20):
    audio_path = 'hungry/hungry_' + str(i+1) + '.wav'
    y, sr = librosa.load(audio_path)
    mfcc = librosa.feature.mfcc(y=y, sr=sr)
    temp = mfcc.mean(axis=1)
    X_train[i] = temp

for i in range(20):
    audio_path = 'laugh/laugh_' + str(i+1) + '.wav'
    y, sr = librosa.load(audio_path)
    mfcc = librosa.feature.mfcc(y=y, sr=sr)
    temp = mfcc.mean(axis=1)
    X_train[i+20] = temp

# step3 데이트 셋으로 묶기
data_sets = np.zeros((40, 21))
data_sets[:, 0:20] = X_train
data_sets[:, 20] = y_train

# 2 학습 데이터의 특성 시각화하기

# 관측치별 변화율


def AccumAscentCurv(A):
    accVal = 0

    for i in range(len(A)-1):
        accVal = accVal + abs(A[i+1] - A[i])

    return accVal


X = [AccumAscentCurv(X_train[i]) for i in range(40)]
y = y_train

# 6 프로그래밍으로 해결하기

# step1 데이터 준비하기

X = np.array(X).reshape(40, 1)
y = y.reshape(40, 1)

# step2 비용 계산하기


def sigmoid(X):
    return 1 / (1 + np.exp(-X))


def cost_func(X, a):
    delta = 1e-7
    temp = beta0 + np.dot(X, beta1)
    Y_pred = sigmoid(temp)

    # likelihood
    return -np.sum(a * np.log(Y_pred + delta) + (1 - a) * np.log((1 - Y_pred) + delta))


def Error(X, a):
    delta = 1e-7
    temp = beta0 + np.dot(X, beta1)
    Y_pred = sigmoid(temp)
    # likelihood
    return -np.sum(a * np.log(Y_pred + delta) + (1 - a) * np.log((1 - Y_pred) + delta))


def predict(X):
    temp = np.dot(X, beta1) + beta0
    Y_pred = sigmoid(temp)

    if Y_pred >= 0.79:
        result = 1
    else:
        result = 0

    return Y_pred, result

# step3 데이터 업데이트 하기


def numerical_derivative(f, x):
    delta_x = 1e-4
    grad = np.zeros_like(x)
    it = np.nditer(x, flags=['multi_index'], op_flags=['readwrite'])

    while not it.finished:
        idx = it.multi_index
        tmp_val = x[idx]
        x[idx] = float(tmp_val) + delta_x
        fx1 = f(x)
        x[idx] = tmp_val - delta_x
        fx2 = f(x)
        grad[idx] = (fx1 - fx2) / (2*delta_x)
        x[idx] = tmp_val
        it.iternext()

    return grad


learning_rate = 1e-3
beta1 = np.random.rand(1, 1)
beta0 = np.random.rand(1)
def F(X): return cost_func(X, y)


for step in range(10000001):
    beta1 -= learning_rate * numerical_derivative(F, beta1)
    beta0 -= learning_rate * numerical_derivative(F, beta0)

    if (step % 100000 == 0):
        print('Epoch =', step, 'error value = ', Error(X, y))
