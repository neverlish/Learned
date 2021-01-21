import pandas as pd

fifa2019 = pd.read_csv('fifa2019.csv')

# step2 원하는 범위의 데이터 검색하기
sub2 = fifa2019.loc[2:16]
print(sub2)
