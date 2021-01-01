import matplotlib.pyplot as plt
import librosa
import librosa.display

folder = ['discomfort', 'hungry', 'h', 'tired']
set_label = []

# step3 여러 개의 소리 그래프를 하나의 화면에 나누어 표현하기

for i in range(1, 10):
    plt.subplot(3, 3, i)
    a = folder[0] + '/' + folder[0] + '_' + str(i) + '.wav'
    y, sr = librosa.load(a)

    librosa.display.waveplot(y, sr=sr)
    plt.title(folder[0] + str(i))

plt.tight_layout()
plt.show()
