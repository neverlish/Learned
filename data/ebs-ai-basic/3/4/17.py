# 문제 해결하기

# step1 울음 소리 파일을 숫자 데이터로 변환하기

import numpy as np
import librosa

audio_path = 'test01.wav'
y, sr = librosa.load(audio_path)
mfcc = librosa.feature.mfcc(y=y, sr=sr)
X_test = mfcc.mean(axis=1)

# step2 울음소리에 대한 숫자 데이터를 기울기 변화량으로 변환하기


def AccumAscentCurv(A):
    accVal = 0

    for i in range(len(A)-1):
        accVal = accVal + abs(A[i+1] - A[i])

    return accVal


X_test = np.array(AccumAscentCurv(X_test)).reshape(1, 1)
print(X_test)
