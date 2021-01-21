# step1 파일에 저장한 데이터를 불러와 출력하기

import pandas as pd

fifa2019 = pd.read_csv('fifa2019.csv')

# step2 fifa에 저장된 개별 값들을 열별로 확인하기

print(fifa2019.info())
