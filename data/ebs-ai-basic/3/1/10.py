import matplotlib.pyplot as plt
import pandas as pd

fifa2019 = pd.read_csv('fifa2019.csv')

# step2 선수들이 선호하는 발의 종류를 원 그래프로 나타내기

fifa2019['Preferred Foot'].value_counts().plot(kind='pie', autopct='%1.f%%')
plt.legend()
plt.show()
