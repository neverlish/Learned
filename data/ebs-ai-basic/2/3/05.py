# 1. 소리 데이터에 필요한 외부 모듈과 환경 변수 설정하기
import numpy as np
import matplotlib.pyplot as plt
from scipy.io.wavfile import write
import os

# 2. 생성할 소리 데이터의 속성과 사인함수로 생성할 데이터를 저장하기 위한 환경 변수 설정하기

# sampling rate
# 정보 샘플링 주파수. 1초에 44100개의 샘플링, 단위는 Hz(주파수)
Fs = 44100.0

# 1초 데이터 생성을 위한 환경 변수 설정
tlen = 1
Ts = 1 / Fs
# 소리 데이터를 생성할 시간 성분으로 구성된 배열로 0과 1 사이를 Ts(TimeStamp) 의 간격으로 분할하여 Fs 개의 데이터를 담을 수 있는 배열 t를 생성
t = np.arange(0, tlen, Ts)

# 3. 사인함수를 이용하여 임의의 소리 데이터 만들기

# 사인 곡선의 주파수
sin_freq = 440
# t 배열의 각 성분값에 사인함수의 주기를 라디만 단위로 변환한 src 배열을 준비
src = 2 * np.pi * sin_freq * t

# timestamp를 각으로 변환한 src 배열에 맞게 사인함수 데이터를 변환
signal = np.sin(src)

# 데이터의 시각화: 생성한 시그널 데이터를 그래프로 표현
# 시작부터 200개의 데이터만 보여 주기 위한 범위값 지정
x_range = 200

# 균등분포의 난수로 구성된 잡음 데이터 생성
noise = np.random.uniform(-1, 1, len(t))

signal_n = signal + noise
scaled_noise = noise * 0.3
signal_n = signal + scaled_noise

scaled = np.int16(signal_n / np.max(np.abs(signal_n)) * 32767)
write('snd_noise.wav', 44100, scaled)

plt.plot(t[0:x_range], signal[0:x_range], color='blue')
plt.plot(t[0:x_range], scaled_noise[0:x_range], color='red')
plt.show()
plt.plot(t[0:x_range], signal_n[0:x_range], color='green')
plt.show()
