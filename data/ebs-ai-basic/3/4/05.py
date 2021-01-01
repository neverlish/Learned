import matplotlib.pyplot as plt
import librosa
import librosa.display

# step2 여러 개의 소리 데이터를 불러와 하나의 그래프로 표현하기


folder = ['discomfort', 'hungry', 'laugh', 'tired']
set_label = []

for i in range(1, 11):
    a = folder[0] + '/' + folder[0] + '_' + str(i) + '.wav'
    y, sr = librosa.load(a)

    librosa.display.waveplot(y, sr=sr, alpha=0.5)
    set_label.append(i)

plt.legend(set_label)
plt.title(folder[0])
plt.xlabel('Time(ms')
plt.ylabel('Sound(dB)')
plt.show()
