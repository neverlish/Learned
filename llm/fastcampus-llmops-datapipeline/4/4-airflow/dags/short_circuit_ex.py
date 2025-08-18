import random
from datetime import datetime

from airflow.decorators import dag, task
from airflow.models.baseoperator import chain
from airflow.operators.empty import EmptyOperator


@dag(
    dag_id="short_circuit_ex",
    start_date=datetime(2025, 2, 1),
    schedule=None,
    catchup=False,
)
def short_circuit_ex():

    @task.short_circuit
    def condition_is_true():
        return True

    @task.short_circuit
    def condition_is_false():
        return False

    ds_true = [EmptyOperator(task_id='true_' + str(i)) for i in [1, 2]]
    ds_false = [EmptyOperator(task_id='false_' + str(i)) for i in [1, 2]]

    chain(condition_is_true(), *ds_true)
    chain(condition_is_false(), *ds_false)


short_circuit_ex()