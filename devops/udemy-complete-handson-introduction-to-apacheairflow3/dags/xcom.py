from airflow.sdk import dag, task, Context
from typing import Dict, Any

@dag
def xcom_dag():
    @task
    def t1() -> Dict[str, Any]:
        # context['ti'].xcom_push(key='my_key', value=val)
        my_val = 42
        my_sentence = "Hello, World!"
        return {
            "my_val": my_val,
            "my_sentence": my_sentence
        }


    @task
    # def t2(context: Context):
    #     val = context['ti'].xcom_pull(task_ids='t1', key='my_key')
    #     print(val)
    def t2(val: Dict[str, Any]):
        print(val)

    val = t1()
    t2(val)

xcom_dag()
