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


# step5 붓꽃 분류 함수를 사용하여 가상의 데이터 분류하기
test_1 = features[149]

# 150번째 데이터와 유사한 가상의 데이터
test_2 = np.array([6, 2.9, 5, 2])

# K_NN 분류 함수를 이용하여 분류하기
result_1 = K_NN(test_1, features, 3)
result_2 = K_NN(test_2, features, 3)

# 결과 출력
print('실제 데이터를 분류한 결과 : {0}'.format(result_1))
print('가상 데이터를 분류한 결과 : {0}'.format(result_2))
