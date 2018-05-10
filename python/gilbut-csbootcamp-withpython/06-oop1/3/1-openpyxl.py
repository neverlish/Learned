# 06 - 3 - 2 openpyxl 모듈로 데이터 읽어들이기

from openpyxl import *
wb = load_workbook('exam.xlsx')
print(wb.sheetnames) # ['시트 1']

ws = wb.active
print(ws) # <Worksheet "시트 1">

g = ws.rows
cells = next(g)
print(cells) # (<Cell 시트 1.A1>, <Cell 시트 1.B1>, <Cell 시트 1.C1>, <Cell 시트 1.D1>)

keys = []
for cell in cells:
  keys.append(cell.value)

print(keys) # ['Name', 'math', 'literature', 'science']

student_data = []
for row in g:
  dic = {k: c.value for k, c in zip(keys, row)}
  student_data.append(dic)

print(student_data)

# [{'Name': 'greg', 'math': 95, 'literature': 65, 'science': 75}, 
# {'Name': 'john', 'math': 25, 'literature': 30, 'science': 55}, 
# {'Name': 'yang', 'math': 50, 'literature': 45, 'science': 40}, 
# {'Name': 'timothy', 'math': 15, 'literature': 65, 'science': 90}, 
# {'Name': 'melisa', 'math': 100, 'literature': 100, 'science': 100}, 
# {'Name': 'thor', 'math': 10, 'literature': 15, 'science': 20}, 
# {'Name': 'elen', 'math': 25, 'literature': 50, 'science': 100}, 
# {'Name': 'mark', 'math': 80, 'literature': 75, 'science': 80}, 
# {'Name': 'steve', 'math': 95, 'literature': 100, 'science': 95}, 
# {'Name': 'anna', 'math': 20, 'literature': 20, 'science': 20}]

tu_li = [('a', 97), ('b', 98), ('c', 99), ('d', 100)]
dic = {k: v for k, v in tu_li}
print(dic) # {'a': 97, 'b': 98, 'c': 99, 'd': 100}
