import librosa
import librosa.display

audio = 'discomfort/discomfort_1.wav'
y, sr = librosa.load(audio)
print(y)
print(sr)
