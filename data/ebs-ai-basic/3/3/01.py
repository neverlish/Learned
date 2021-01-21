import csv

f = open('temp_ice.csv', encoding='euc-kr')

data = csv.reader(f)

header = next(data)

temp = []
ice = []

for row in data:
    temp.append(float(row[1]))
    ice.append(int(row[4]))

print(temp)
print(ice)
