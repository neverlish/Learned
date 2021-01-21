# 데이터로부터 시간대별 평균 유동 인구수 구하기

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

day_title = ['MON', 'TUE', 'WED', 'THR', 'FRI', 'SAT', 'SUN']
hour_title = [
    '01', '02', '03', '04', '05', '06', '07', '08', '09', '10',
    '11', '12', '13', '14', '15', '16', '17', '18', '19', '20',
    '21', '22', '23', '24'
]

avgh = []

for j in range(0, 24):
    day_sum = 0

    for i in range(0, 7):
        day_sum = day_sum + int(a[i][j]['num'])

    avgh.append(day_sum / 7)

for j in range(0, 24):
    print('[~{0}:00]: {1:4}'.format(hour_title[j], int(avgh[j])))
