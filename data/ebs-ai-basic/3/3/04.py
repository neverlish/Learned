import numpy as np
import csv

f = open('temp_ice.csv', encoding='euc-kr')

data = csv.reader(f)

header = next(data)

temp = []
ice = []

for row in data:
    temp.append(float(row[1]))
    ice.append(int(row[4]))

# step3 도수분포 구간을 재설정하여 출력하기

bins = np.arange(min(temp), max(temp)+5, 5)
print(bins)
