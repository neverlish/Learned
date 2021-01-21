# step2 여러 개의 자료형 변환하기

import csv

f = open('Iris.csv')
data = csv.reader(f)
header = next(data)
result = []

for row in data:
    result.append(row)

# result에 저장된 값 중 꽃받침과 꽃잎의 길이, 너비 값을 숫자로 바꾼 후 출력하기
for i in result:
    for j in range(1, 5):
        i[j] = float(i[j])
    print(i)
