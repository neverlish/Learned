# 06 - 3 - 4 메인 프로그램 만들기

from functions import *

# 학년 전체 학생의 평균: 50점
if __name__ == '__main__':
  raw_data = get_data_from_excel('class_2_3.xlsx')
  scores = list(raw_data.values())

  avrg = average(scores)
  variance = variance(scores, avrg)
  standard_deviation = std_dev(variance)

  print(
    '평균: {0}, 분산: {1}, 표준편차: {2}'.format(
    avrg, variance, standard_deviation)) # 평균: 51.5, 분산: 1240.2, 표준편차: 35.2

  evaluateClass(avrg, 50, standard_deviation, 20) # 성적은 평균 이상이지만 학생들의 실력 차이가 크다. 주의 요망!
