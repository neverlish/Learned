# step1 데이터 불러오기

import numpy as np
import pandas as pd

iris = pd.read_csv('Iris.csv')

# step2 150개 데이터의 특성 데이터와 종류 데이터를 나누어 저장하기

# 계산의 편의를 위해 데이터셋의 형식을 numpy로 변환
xy = np.array(iris)

# 테이블의 1~4열벡터를 features에 저장
features = xy[:, 1:-1]
# 테이블의 마지막 열벡터를 target_value에 저장
target_value = xy[:, [-1]]

# step3 유클리드 거리법을 이용하여 두 데이터간의 거리를 구하는 함수 선언하기


def Distance(A, B):
    return np.sqrt(np.sum(np.power((A-B), 2)))

# step4 붓꽃 분류 작성하기


def K_NN(Unknown, features, K):
    distance_result = np.zeros(150)
    for i in range(150):
        distance_result[i] = Distance(Unknown, features[i])

    index = distance_result.argsort()

    target_result = []

    result = [0, 0, 0]

    for i in range(K):
        target_result.append(target_value[index[i]])

        if target_result[i] == 'Iris-setosa':
            result[0] += 1

        elif target_result[i] == 'Iris-versicolor':
            result[1] += 1
        else:
            result[2] += 1

    max_label = result.index(max(result))

    species = {0: 'setosa', 1: 'versicolor', 2: 'virginicia'}
    species_result = species[max_label]

    return species_result

# step6 고흐가 그린 붓꽃 그림의 데이터 분류하기


ID_1 = np.array([2.7, 2.4, 1.65, 0.67])
ID_2 = np.array([5.84, 5.48, 3, 2.16])
ID_3 = np.array([3.97, 4.01, 1.7, 0.67])

result_1 = K_NN(ID_1, features, 5)
result_2 = K_NN(ID_2, features, 5)
result_3 = K_NN(ID_3, features, 5)

print(result_1, result_2, result_3)
