import matplotlib.pyplot as plt
import pandas as pd

iris = pd.read_csv('Iris.csv')

# step2 꽃받침 길이와 너비를 분산형 그래프로 나타내기

fig = iris[iris.Species == 'Iris-setosa'].plot(
    kind='scatter', x='SepalLengthCm', y='SepalWidthCm', color='orange', label='setosa')

iris[iris.Species == 'Iris-versicolor'].plot(
    kind='scatter', x='SepalLengthCm', y='SepalWidthCm', color='blue', label='versicolor', ax=fig)

iris[iris.Species == 'Iris-virginica'].plot(
    kind='scatter', x='SepalLengthCm', y='SepalWidthCm', color='green', label='virginica', ax=fig)

fig.set_xlabel('Sepal Length')
fig.set_ylabel('Sepal Width')
fig.set_title('Sepal Length VS Width')
fig = plt.gcf()
fig.set_size_inches(10, 6)
plt.show()
