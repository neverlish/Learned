import matplotlib.pyplot as plt
import numpy as np
import pandas as pd

df_train = pd.read_csv('fashion-mnist_train.csv')
df_test = pd.read_csv('fashion-mnist_test.csv')

data_train = np.array(df_train, dtype=np.float32)
x_train = data_train[:, 1:]
y_train = data_train[:, 0]

data_test = np.array(df_test, dtype=np.float32)
x_test = data_test[:, 1:]
y_test = data_test[:, 0]

# step1 데이터를 활용하여 바지 이미지 출력하기

label_dictionary = {0: 'T-shirt/top', 1: 'Trouser', 2: 'Pullover',
                    3: 'Dress', 4: 'Coat', 5: 'Sandal', 6: 'Shirt',
                    7: 'Sneaker', 8: 'Bag', 9: 'Ankle boot'}

# 훈련 데이터 중 1개 행 데이터 시각화
i = 109

plt.imshow(x_train[i].reshape(28, 28), cmap='gray')
plt.colorbar()
plt.title('Label {}, {}'.format(y_train[i], label_dictionary[y_train[i]]))
plt.show()
