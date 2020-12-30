# step1 파일에 저장한 데이터를 불러와 출력하기

import pandas as pd

fifa2019 = pd.read_csv('fifa2019.csv')

print(fifa2019.shape)
