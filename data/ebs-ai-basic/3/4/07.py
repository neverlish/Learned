import matplotlib.pyplot as plt
import librosa
import librosa.display

folder = ['discomfort', 'hungry', 'laugh', 'tired']
set_label = []

# step4 서로 다른 상황의 아기 소리비교하기


for i in range(0, 4):
    plt.subplot(4, 1, i+1)

    a = folder[i] + '/' + folder[i] + '_1.wav'
    y, sr = librosa.load(a)
    librosa.display.waveplot(y, sr=sr)
    plt.title(folder[i])

plt.tight_layout()
plt.show()
