import csv

f = open('temp_ice.csv', encoding='euc-kr')

data = csv.reader(f)

header = next(data)

temp = []
ice = []

for row in data:
    temp.append(float(row[1]))
    ice.append(int(row[4]))

# step1 평균 기온 값의 최솟값과 최댓값을 찾아 출력하기
print(min(temp), max(temp))
