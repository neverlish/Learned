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

# step1 붓꽃 데이터를 종류별로 따로 저장하기
a = []
b = []
c = []

for i in result:
    if i[5] == 'Iris-setosa':
        a.append(i[0:5])
    if i[5] == 'Iris-versicolor':
        b.append(i[0:5])
    if i[5] == 'Iris-virginica':
        c.append(i[0:5])

# step2 Iris-setosa의 꽃잎과 꽃받침 길이, 너비에 따른 평균 구하기

SL = []  # 꽃받침 길이
SW = []  # 꽃받침 너비
PL = []  # 꽃잎 길이
PW = []  # 꽃잎 너비

for i in a:
    SL.append(i[1])
    SW.append(i[2])
    PL.append(i[3])
    PW.append(i[4])

print('<Iris-setosa의 특성별 평균>')
print('꽃받침 길이 평균:', round(sum(SL)/len(SL), 3), '\n꽃받침너비평균:', round(sum(SW)/len(SW), 3),
      '\n꽃잎 길이 평균:', round(sum(PL)/len(PL), 3), '\n꽃잎너비평균:', round(sum(PW)/len(PW), 3),)
