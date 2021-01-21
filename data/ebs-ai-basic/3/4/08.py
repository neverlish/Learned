import matplotlib.pyplot as plt
import librosa
import librosa.display

folder = ['discomfort', 'hungry', 'laugh', 'tired']
set_label = []

# step5 각 소리 데이터를 일정 시간만큼 그래프로 표현하기

for i in range(0, 4):
    plt.subplot(4, 1, i+1)

    a = folder[i] + '/' + folder[i] + '_1.wav'
    y, sr = librosa.load(a)
    librosa.display.waveplot(y[:100000], sr=sr)
    plt.title(folder[i])

plt.tight_layout()
plt.show()
