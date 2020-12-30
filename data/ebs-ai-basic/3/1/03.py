import pandas as pd

fifa2019 = pd.read_csv('fifa2019.csv')

# step1 궁금한 선수의 데이터 검색하기
sub1 = fifa2019.loc[14]
print(sub1)
