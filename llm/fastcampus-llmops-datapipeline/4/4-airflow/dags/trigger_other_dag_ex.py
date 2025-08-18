import pendulum

from airflow.decorators import dag
from airflow.operators.empty import EmptyOperator
from airflow.operators.trigger_dagrun import TriggerDagRunOperator
from airflow.utils.trigger_rule import TriggerRule


@dag(
    dag_id="trigger_other_dag_ex",
    schedule=None,
    start_date=pendulum.datetime(2024, 2, 8, tz="UTC"),
    catchup=False,
    tags=["example"],
)
def trigger_other_dag_ex():
    start = EmptyOperator(task_id="start")

    trigger_short_circuit = TriggerDagRunOperator(task_id="trigger_short_circuit",
                                                  trigger_dag_id="short_circuit_ex",
                                                  trigger_rule=TriggerRule.ALL_SUCCESS)

    start >> trigger_short_circuit


trigger_other_dag_ex()