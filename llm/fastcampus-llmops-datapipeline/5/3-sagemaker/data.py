import numpy as np
import pandas as pd
from sklearn.impute import KNNImputer
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import OneHotEncoder


train = pd.read_csv('data/train.csv')
test = pd.read_csv('data/test.csv')

X = train.drop('SalePrice', axis=1)
y = train['SalePrice']

X_train, X_val, y_train, y_val = train_test_split(X, y, test_size=0.2, random_state=42)

imputer = KNNImputer()

numeric_cols = X_train.select_dtypes(include=['int64', 'float64']).columns
non_numeric_cols = X_train.select_dtypes(exclude=['int64', 'float64']).columns

imputer = KNNImputer()
X_train[numeric_cols] = imputer.fit_transform(X_train[numeric_cols])
X_val[numeric_cols] = imputer.transform(X_val[numeric_cols])
test[numeric_cols] = imputer.transform(test[numeric_cols])

for column in non_numeric_cols:
    X_train[column].fillna(X_train[column].mode()[0], inplace=True)
    X_val[column].fillna(X_val[column].mode()[0], inplace=True)
    test[column].fillna(test[column].mode()[0], inplace=True)


ohe = OneHotEncoder(drop='first', handle_unknown='ignore')

X_train = ohe.fit_transform(X_train)
X_val = ohe.transform(X_val)
test = ohe.transform(test)