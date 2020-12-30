import pandas as pd

fifa2019 = pd.read_csv('fifa2019.csv')

# step3 전체 선수들의 이름과 선호하는 발 정보 출력하기
sub3 = fifa2019.loc[:, ['Name', 'Preferred Foot']]
print(sub3)
