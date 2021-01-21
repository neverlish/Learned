# step1 한 개의 소리 데이터를 불러와 그래프로 표현하기

import matplotlib.pyplot as plt
import librosa
import librosa.display

audio = 'discomfort/discomfort_1.wav'
y, sr = librosa.load(audio)

librosa.display.waveplot(y, sr=sr)

plt.title('Waveplot')
plt.show()
