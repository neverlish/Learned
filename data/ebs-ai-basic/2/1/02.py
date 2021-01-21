# 유동 인구수 데이터의 총합과 평균 구하기

a = [242, 256, 237, 223, 263, 81, 46]

n = len(a)

my_sum = 0
my_avg = 0
i = 0

for i in range(0, n):
    my_sum = my_sum + a[i]

my_avg = my_sum / n
print('Total Sum : ', my_sum)
print('Total Average : ', my_avg)
