# 06 - 5 - 3 메인 프로그램 만들기

from datahandler import *

# 전체 학년 평균: 50점
dh = DataHandler('class_2_3.xlsx', '2-3')
dh.get_evaluation(50)

# **************************************************
# 2-3 반 성적 분석 결과
# 2-3반의 평균은 51.5점이고 분산은 1240.2이며 따라서 표준편차는 35.2이다.
# **************************************************
# 2-3 반 종합평가
# **************************************************
# 성적은 평균 이상이지만 학생들의 실력 차이가 크다. 주의 요망!
