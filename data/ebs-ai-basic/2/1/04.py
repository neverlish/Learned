# 주중 유동 인구수의 합과 평균을 구해 그래프와 함께 출력하기

from matplotlib import font_manager, rc
import matplotlib.pyplot as plt
a = [242, 256, 237, 223, 263, 81, 46]

font_name = font_manager.FontProperties(fname='./malgun.ttf').get_name()
rc('font', family=font_name)

x_data = ['MON', 'TUE', 'WED', 'THR', 'FRI', 'SAT', 'SUN']

weekday_size = 5
weekday_sum = 0
weekday_avg = 0

for i in range(0, weekday_size):
    weekday_sum = weekday_sum + a[i]

weekday_avg = weekday_sum / weekday_size

print('weekday Data = ', a[0:5])
print('weekday Sum :', weekday_sum)
print('weekday Average : ', weekday_avg)

plt.title('주중 유동 인구수 데이터', fontsize=16)
plt.xlabel('요일', fontsize=12)
plt.ylabel('유동인구수', fontsize=12)

plt.plot(x_data, a)
plt.scatter(x_data[0:weekday_size], a[0:weekday_size],
            c='red', edgecolor='none', s=50)
plt.show()
