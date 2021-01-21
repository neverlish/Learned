# 파일로 저장된 데이터 불러오기

import csv

a = [[], [], [], [], [], [], []]

with open('passby_data.csv', 'r') as f:
    reader = csv.DictReader(f)
    i = j = 0

    for row in reader:
        a[i].append(row)
        j = j + 1

        if (j % 24 == 0):
            i = i + 1

x_title = ['MON', 'TUE', 'WED', 'THR', 'FRI', 'SAT', 'SUN']

for i in range(0, 7):
    for j in range(0, len(a[i])):
        print(x_title[i], '[', j, '] = ', a[i][j])
