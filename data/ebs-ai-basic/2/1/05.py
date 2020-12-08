# 데이터를 직접 설정해 보기

# dictionary : 요일별로 각 시간대에 저장해야 할 데이터 {num, wnum, ynum}
# 7 x 24 크기의 list 이 필요

# 월요일 리스트 -  27쪽 표에서 월요일 데이터를 리스트에 저장하기
a1 = []                                     # 리스트 선언
a1.append({'num': 0, 'wnum': 0, 'ynum': 0})
a1.append({'num': 0, 'wnum': 0, 'ynum': 0})
a1.append({'num': 0, 'wnum': 0, 'ynum': 0})
a1.append({'num': 0, 'wnum': 0, 'ynum': 0})
a1.append({'num': 0, 'wnum': 0, 'ynum': 0})
a1.append({'num': 7, 'wnum': 5, 'ynum': 6})
a1.append({'num': 4, 'wnum': 1, 'ynum': 3})
a1.append({'num': 20, 'wnum': 1, 'ynum': 16})
a1.append({'num': 22, 'wnum': 0, 'ynum': 16})
a1.append({'num': 17, 'wnum': 4, 'ynum': 16})
a1.append({'num': 5, 'wnum': 1, 'ynum': 5})
a1.append({'num': 13, 'wnum': 5, 'ynum': 13})
a1.append({'num': 19, 'wnum': 11, 'ynum': 18})
a1.append({'num': 9, 'wnum': 5, 'ynum': 1})
a1.append({'num': 14, 'wnum': 10, 'ynum': 4})
a1.append({'num': 18, 'wnum': 16, 'ynum': 4})
a1.append({'num': 15, 'wnum': 13, 'ynum': 2})
a1.append({'num': 13, 'wnum': 5, 'ynum': 10})
a1.append({'num': 18, 'wnum': 13, 'ynum': 14})
a1.append({'num': 16, 'wnum': 16, 'ynum': 13})
a1.append({'num': 8, 'wnum': 5, 'ynum': 7})
a1.append({'num': 10, 'wnum': 8, 'ynum': 7})
a1.append({'num': 10, 'wnum': 8, 'ynum': 10})
a1.append({'num': 4, 'wnum': 0, 'ynum': 3})

a2 = []                                     # 화요일 데이터를 저장할 딕셔너리 리스트
a2.append({'num': 0, 'wnum': 0, 'ynum': 0})    # 더미 데이터 넣기

a = [a1, a2]

for i in range(0, len(a[0])):
    print('Mon[', i, '] = ', a[0][i])
