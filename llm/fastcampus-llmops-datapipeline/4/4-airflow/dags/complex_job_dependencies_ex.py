import json

import pendulum

from airflow.decorators import dag, task
from airflow.utils.trigger_rule import TriggerRule


@dag(
    dag_id="complex_job_dependencies_ex",
    schedule=None,
    start_date=pendulum.datetime(2024, 2, 8, tz="UTC"),
    catchup=False,
    tags=["example"],
)
def complex_job_dependencies_ex():
    @task
    def t1():
        print("t1")
        return

    @task
    def t2():
        print("t2")
        return

    @task
    def t3():
        print("t3")
        return

    @task(trigger_rule=TriggerRule.ALL_SUCCESS)
    def t4():
        print("t4")
        return

    @task
    def t5():
        print("t5")
        return

    @task
    def t6():
        print("t6")
        return

    @task
    def t7():
        print("t7")
        return

    @task(trigger_rule=TriggerRule.ALL_FAILED)
    def t8():
        print("t8")
        return

    t1 = t1()
    t2 = t2()
    t3 = t3()
    t4 = t4()
    t5 = t5()
    t6 = t6()
    t7 = t7()
    t8 = t8()

    # two configs are same
    # [t1, t2, t3] >> t4 >> [t5, t6]
    # t5 >> t7
    # t6 >> t8

    t4.set_upstream([t1, t2, t3])
    t4.set_downstream([t5, t6])
    t5.set_downstream([t7])
    t6.set_downstream([t8])


complex_job_dependencies_ex()