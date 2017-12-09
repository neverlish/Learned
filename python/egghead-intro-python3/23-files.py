# 23 Read and Parse Files in Python

# f = open('animals.csv')

# for line in f:
#   print(line)

# f.close()

######

# with open('animals.csv', 'r') as f:
#   print(f.read())

import csv
with open('animals.csv', 'r') as f:
  animals = csv.reader(f)
  for row in animals:
    if row[-1] == 'True':
      print('{0} is a {1} and is houseBroken'.format(row[0], row[1]))
    else:
      print('{0} is a {1} and is not houseBroken!'.format(row[0], row[1]))

import json
with open('animals.json', 'r') as r:
  data = json.load(r)
  for row in data:
    print(row['name'])
