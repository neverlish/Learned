import random
from datetime import datetime

from airflow.decorators import dag, task
from airflow.operators.empty import EmptyOperator
from airflow.utils.edgemodifier import Label


@dag(
    dag_id="branch_ex",
    schedule=None,
    start_date=datetime(2025, 2, 1),
    catchup=False,
    tags=["example"],
)
def branch_ex():
    first = EmptyOperator(task_id="first")

    options = ["branch_a", "branch_b", "branch_c", "branch_d"]

    @task.branch(task_id="branching")
    def random_choice(choices):
        return random.choice(choices)

    random_choice = random_choice(choices=options)

    first >> random_choice
    join = EmptyOperator(
        task_id="join",
        trigger_rule="none_failed_min_one_success"
    )


    for option in options:
        t = EmptyOperator(
            task_id=option
        )

        empty_follow = EmptyOperator(
            task_id="follow_" + option
        )

        random_choice >> Label(option) >> t >> empty_follow >> join


branch_ex()