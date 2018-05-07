# 06 - 3 - 3 평균, 분산, 표준편차를 함수로 만들기

import openpyxl
import math
# 학년 전체 학생의 평균: 50점

raw_data = {}
wb = openpyxl.load_workbook('class_2_3.xlsx')
ws = wb.active
g = ws.rows

for name, score in g:
  raw_data[name.value] = score.value

scores = list(raw_data.values())
s = 0

for score in scores:
  s += score

avrg = round(s/len(scores), 1)

s = 0
for score in scores:
  s += (score - avrg) ** 2

variance = round(s/len(scores), 1)
std_dev = round(math.sqrt(variance), 1)

print(
  '평균: {0}, 분산: {1}, 표준편차: {2}'.format(
  avrg, variance, std_dev)) # 평균: 51.5, 분산: 1240.2, 표준편차: 35.2

if avrg < 50 and std_dev > 20:
  print('성적이 너무 저조하고 학생들의 실력 차이가 너무 크다.')
elif avrg > 50 and std_dev > 20:
  print('성적은 평균 이상이지만 학생들의 실력 차이가 크다. 주의 요망!')
elif avrg < 50 and std_dev < 20:
  print('학생들의 실력 차이는 크지 않지만 성적이 너무 저조하다. 주의 요망!')
elif avrg > 50 and std_dev < 20:
  print('성적도 평균 이상히고 학생들의 실력 차이도 크지 않다.')

# 성적은 평균 이상이지만 학생들의 실력 차이가 크다. 주의 요망!
