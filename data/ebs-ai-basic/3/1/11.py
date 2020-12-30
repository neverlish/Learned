# step1 데이터 불러오기

import pandas as pd

fifa2019 = pd.read_csv('fifa2019.csv')

df = pd.DataFrame.copy(fifa2019.sort_values(
    by='Overall', ascending=False).head(200))

test_features = ['Name', 'Stamina', 'Dribbling', 'ShortPassing', 'Penalties']

test_df = pd.DataFrame(df, columns=test_features)
print(test_df.head(5))
