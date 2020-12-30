# step1 붓꽃 데이터를 불러와 출력하기

import csv

f = open('Iris.csv')
data = csv.reader(f)
result = []

for row in data:
    result.append(row)
    print(row)
