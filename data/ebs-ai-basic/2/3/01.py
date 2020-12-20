# 1. 소리 데이터의 처리에 필요한 외부 모듈 설정하기
import numpy as np
import matplotlib.pyplot as plt
import scipy.io.wavfile
import sounddevice as sd

# 2. 그래프로 표현할 소리 파일 읽어오기
v_samplerate, v_data = scipy.io.wavfile.read('thank_you.wav')
times = np.arange(len(v_data)) / float(v_samplerate)

# 3. 그래프로 표현할 소리 파일 확인하기

print('sampling rate: ', v_samplerate)
print('time : ', times[-1])
print('vData : ', v_data[5000:5100])
sd.play(v_data, v_samplerate)

plt.plot(times, v_data)
plt.xlim(times[0], times[-1])
plt.xlabel('times (s)')
plt.ylabel('amplitude')
plt.show()
