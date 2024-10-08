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

print(X[:5])
print(y[:5])
