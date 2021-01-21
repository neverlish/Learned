# 2 음성카드 만들기

# step1 나만의 소리 파일의 데이터와 샘플링 주파수 확인하기
import matplotlib.pyplot as plt
import numpy as np
import scipy.io as sio
from scipy.io.wavfile import write
import os

v_samplerate, v_data = sio.wavfile.read('thank_you.wav')
b_samplerate, b_data = sio.wavfile.read('Invisible_Beauty.wav')

v_times = np.arange(len(v_data)) / float(v_samplerate)
b_times = np.arange(len(b_data)) / float(b_samplerate)

# step2 나만의 소리 파일의 데이터와 샘플리 주파수를 그래프로 출력하기


plt.plot(v_times, v_data)
plt.xlim(v_times[0], v_times[-1])
plt.xlabel('voice time (s)')
plt.ylabel('amplitude')
plt.show()

plt.plot(b_times, b_data)
plt.xlabel('bg time(s)')
plt.ylabel('amplitude')
plt.show()
