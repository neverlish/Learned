import pandas as pd

fifa2019 = pd.read_csv('fifa2019.csv')

# step5 우리나라 선수들 출력하기
korea_player = fifa2019['Nationality'] == 'Korea Republic'
sub5 = fifa2019.loc[korea_player]

# step6 우리나라 선수들의 이름 출력하기
sub6 = sub5['Name']
print(sub6)
