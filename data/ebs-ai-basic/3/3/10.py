# step1 데이터를 학습(train), 평가(test) 데이터로 분리하기

import pandas as pd

df = pd.read_csv('temp_ice.csv', encoding='euc-kr')
print(df.head(5))
