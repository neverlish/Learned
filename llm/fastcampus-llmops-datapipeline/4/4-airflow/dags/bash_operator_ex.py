from airflow import DAG
from datetime import datetime, timedelta

from airflow.operators.bash import BashOperator

default_args = {
    "owner": "airflow",
    "start_date": datetime(2025, 2, 1),
    "email": ["airflow@airflow.com"],
    "email_on_failure": False,
    "email_on_retry": False,
    "retries": 1,
    "retry_delay": timedelta(minutes=5),
}

dag = DAG("dag_bash_operator_tutorial",
          default_args=default_args,
          schedule_interval=timedelta(days=1))

t1 = BashOperator(task_id="print_date",
                  bash_command="date",
                  dag=dag)

t2 = BashOperator(task_id="sleep",
                  bash_command="sleep 5",
                  retries=3,
                  dag=dag)

# https://airflow.apache.org/docs/apache-airflow/stable/templates-ref.html
templated_command = """
    {% for i in range(5) %}
        echo "{{ ds }}"
        echo "{{ macros.ds_add(ds, 7)}}"
        echo "{{ params.my_param }}"
    {% endfor %}
"""

t3 = BashOperator(
    task_id="templated",
    bash_command=templated_command,
    params={"my_param": "fastcampus"},
    dag=dag,
)

t2.set_upstream(t1)
t3.set_upstream(t1)