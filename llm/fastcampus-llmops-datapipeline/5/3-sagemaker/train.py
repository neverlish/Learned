import mlflow
import numpy as np
from data import X_train, X_val, y_train, y_val
from sklearn.linear_model import ElasticNet
from sklearn.model_selection import ParameterGrid
from params import elasticnet_param_grid
from utils import eval_metrics

for params in ParameterGrid(elasticnet_param_grid):
    with mlflow.start_run():
        lr = ElasticNet(**params)

        lr.fit(X_train, y_train)

        y_pred = lr.predict(X_val)

        metrics = eval_metrics(y_val, y_pred)

        mlflow.log_input(
            mlflow.data.from_numpy(X_train.toarray()),
            context='Training dataset'
        )

        mlflow.log_input(
            mlflow.data.from_numpy(X_val.toarray()),
            context='Validation dataset'
        )

        mlflow.log_params(params)

        mlflow.log_metrics(metrics)

        mlflow.sklearn.log_model(
            lr,
            "ElasticNet",
            input_example=X_train,
            code_paths=['train.py', 'data.py', 'params.py', 'utils.py']
        )