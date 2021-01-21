import matplotlib.pyplot as plt
import pandas as pd

iris = pd.read_csv('Iris.csv')

# step3 꽃잎의 길이와 너비를 분산형 그래프로 나타내기

fig = iris[iris.Species == 'Iris-setosa'].plot(
    kind='scatter', x='PetalLengthCm', y='PetalWidthCm', color='orange', label='setosa')

iris[iris.Species == 'Iris-versicolor'].plot(
    kind='scatter', x='PetalLengthCm', y='PetalWidthCm', color='blue', label='versicolor', ax=fig)

iris[iris.Species == 'Iris-virginica'].plot(
    kind='scatter', x='PetalLengthCm', y='PetalWidthCm', color='green', label='virginica', ax=fig)

fig.set_xlabel('Petal Length')
fig.set_ylabel('Petal Width')
fig.set_title('Petal Length VS Width')
fig = plt.gcf()
fig.set_size_inches(10, 6)
plt.show()
