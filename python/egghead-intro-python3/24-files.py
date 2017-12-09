# 24 Write to a File in Python

# f = open('cars.txt', 'w')
# cars = ['chevy', 'tesla', 'ford']
# for car in cars:
#   f.write(car + '\n')

# f.close()

##########

# with open('cars.txt', 'a') as f:
#   cars = ['chevy', 'tesla', 'ford']
#   for car in cars:
#     f.write(car + '\n')

cars = [
  {"make": "chevy"},
  {"make": "tesla"},
  {"make": "porsche"}
]

import json
with open('cars.json', 'w') as f:
  json.dump(cars, f)
