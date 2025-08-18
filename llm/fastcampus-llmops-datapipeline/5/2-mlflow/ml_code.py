import warnings
import argparse

import mlflow
import pandas as pd
import numpy as np
from sklearn.metrics import mean_squared_error, mean_absolute_error, r2_score
from sklearn.model_selection import train_test_split
from sklearn.linear_model import ElasticNet

parser = argparse.ArgumentParser()
parser.add_argument("--alpha", type=float, required=False, default=0.5)
parser.add_argument("--l1_ratio", type=float, required=False, default=0.5)
args = parser.parse_args()


def eval_metrics(actual, pred):
    rmse = np.sqrt(mean_squared_error(actual, pred))
    mae = mean_absolute_error(actual, pred)
    r2 = r2_score(actual, pred)
    return rmse, mae, r2


if __name__ == "__main__":
    warnings.filterwarnings("ignore")
    np.random.seed(40)

    column_names = [
        "CRIM", "ZN", "INDUS", "CHAS", "NOX", "RM", "AGE", "DIS", "RAD", "TAX",
        "PTRATIO", "B", "LSTAT", "MEDV"
    ]

    df = pd.read_csv("data/housing.csv", sep='\s+', names=column_names)
    print(df.head())

    X = df.drop(columns=["MEDV"])
    Y = df["MEDV"]

    x_train, x_test, y_train, y_test = train_test_split(X, Y, test_size=0.2, random_state=42)

    alpha = args.alpha
    l1_ratio = args.l1_ratio

    exp = mlflow.set_experiment(experiment_name="boston_housing_experiment_1")

    with mlflow.start_run(experiment_id=exp.experiment_id):
        lr = ElasticNet(alpha=alpha, l1_ratio=l1_ratio, random_state=42)
        lr.fit(x_train, y_train)

        predicted_qualities = lr.predict(x_test)

        (rmse, mae, r2) = eval_metrics(y_test, predicted_qualities)

        print("Elasticnet model (alpha={:f}, l1_ratio={:f}):".format(alpha, l1_ratio))
        print("  RMSE: %s" % rmse)
        print("  MAE: %s" % mae)
        print("  R2: %s" % r2)

        mlflow.log_params({
            "alpha": alpha,
            "l1_ratio": l1_ratio,
        })

        mlflow.log_metrics({
            "rmse": rmse,
            "r2": r2,
            "mae": mae,
        })

        mlflow.sklearn.log_model(lr, "test_model")