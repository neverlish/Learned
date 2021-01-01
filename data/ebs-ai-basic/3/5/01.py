import pandas as pd

df_train = pd.read_csv('fashion-mnist_train.csv')
df_test = pd.read_csv('fashion-mnist_test.csv')

print(df_train.info(), '\n')
print(df_test.info(), '\n')
print(df_train.shape, '\n')
print(df_test.shape, '\n')
