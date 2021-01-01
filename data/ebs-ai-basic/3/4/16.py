# 문제 해결하기

# step1 울음 소리 파일을 숫자 데이터로 변환하기

import librosa

audio_path = 'test01.wav'
y, sr = librosa.load(audio_path)
mfcc = librosa.feature.mfcc(y=y, sr=sr)
X_test = mfcc.mean(axis=1)
print(X_test)
