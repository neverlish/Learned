import numpy as np
import pandas as pd


def numerical_derivative(f, x):
    delta_x = 1e-4
    grad = np.zeros_like(x)
    it = np.nditer(x, flags=['multi_index'], op_flags=['readwrite'])

    while not it.finished:
        idx = it.multi_index
        tmp_val = x[idx]
        x[idx] = float(tmp_val) + delta_x
        fx1 = f(x)
        x[idx] = tmp_val - delta_x
        fx2 = f(x)
        grad[idx] = (fx1 - fx2) / (2*delta_x)
        x[idx] = tmp_val
        it.iternext()

    return grad


def Sigmoid(X):
    return 1 / (1+np.exp(-X))  # 로지스틱함수를 표현한 코드


class my_NN01:
    # 클래스 생성자(객체 생성시 호출됨)를 선언
    def __init__(self, input_nodes, hidden_nodes, output_nodes, learning_rate):
        # 입력층, 은닉층, 출력층 노드 개수
        self.input_nodes = input_nodes
        self.hidden_nodes = hidden_nodes
        self.output_nodes = output_nodes

        # 은닉층의 파라미터 W1, B1을 초기화
        self.W1 = np.random.rand(
            self.input_nodes, self.hidden_nodes) / np.sqrt(self.input_nodes / 2)
        self.B1 = np.random.rand(self.hidden_nodes)

        # 출력층 파라미터 W2, B2를 초기화
        self.W2 = np.random.rand(
            self.hidden_nodes, self.output_nodes) / np.sqrt(self.hidden_nodes / 2)
        self.B2 = np.random.rand(self.output_nodes)

        # 학습률 learning rate 초기화
        self.learning_rate = learning_rate

    # 순전파
    def feed_forward(self):
        delta = 1e-7  # log 무한대 발산 방지를 위해 추가함
        A1 = np.dot(self.input_data, self.W1) + self.B1
        Z1 = Sigmoid(A1)
        A2 = np.dot(Z1, self.W2) + self.B2
        y = Sigmoid(A2)

        return -np.sum(self.target_data * np.log(y + delta) + (1 - self.target_data) * np.log((1-y) + delta))

    def cost(self):
        delta = 1e-7  # log 무한대 발산 방지
        A1 = np.dot(self.input_data, self.W1) + self.B1
        Z1 = Sigmoid(A1)
        A2 = np.dot(Z1, self.W2) + self.B2
        y = Sigmoid(A2)

        # 로그최대우도추정법
        cost_val = -np.sum(self.target_data * np.log(y + delta) +
                           (1 - self.target_data) * np.log((1-y) + delta))
        return cost_val

    def train(self, input_data, target_data):
        self.input_data = input_data
        self.target_data = target_data
        def f(x): return self.feed_forward()
        self.W1 -= self.learning_rate * numerical_derivative(f, self.W1)
        self.B1 -= self.learning_rate * numerical_derivative(f, self.B1)
        self.W2 -= self.learning_rate * numerical_derivative(f, self.W2)
        self.B2 -= self.learning_rate * numerical_derivative(f, self.B2)

    def predict(self, input_data):
        A1 = np.dot(self.input_data, self.W1) + self.B1
        Z1 = Sigmoid(A1)
        A2 = np.dot(Z1, self.W2) + self.B2
        y = Sigmoid(A2)

        predicted_num = np.argmax(y)
        return predicted_num

    def accuracy(self, test_data):
        matched_list = []
        not_matched_list = []

        for index in range(len(test_data)):
            label = int(test_data[index, 0])
            data = (test_data[index, 1:] / 255.0 * 0.99) + 0.01
            predicted_num = self.predict(np.array(data, ndmin=2))
            if label == predicted_num:
                matched_list.append(index)
            else:
                not_matched_list.append(index)

            print('정확도 : ', 100 * (len(matched_list) / (len(test_data))), '%')
            return matched_list, not_matched_list


df_train = pd.read_csv('fashion-mnist_train.csv')
df_test = pd.read_csv('fashion-mnist_test.csv')

data_train = np.array(df_train, dtype=np.float32)
data_test = np.array(df_test, dtype=np.float32)

# 모델 객체 만드릭
my_model = my_NN01(784, 100, 10, 0.01)

# 비용함수 값을 저장할 리스트 생성하기
cost_val_list = []

for step in range(len(data_train)):
    input_data = ((data_train[step, 1:] / 255.0) * 0.99) + 0.01
    target_data = np.zeros(10) + 0.01
    target_data[int(data_train[step, 0])] = 0.99
    my_model.train(input_data, target_data)

    if (step % 200 == 0):
        print('단계 : ', step, ' 비용(손실) 값: ', my_model.cost())

        cost_val_list.append(my_model.cost())  # 손실함수 값 저장하기
