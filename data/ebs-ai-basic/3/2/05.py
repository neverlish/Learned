# step1 Iris.csv 파일에 있는 전체 데이터 요약하기

import pandas as pd

iris = pd.read_csv('Iris.csv')

print(iris.head(2))
print(iris.info())
print(iris.describe())
