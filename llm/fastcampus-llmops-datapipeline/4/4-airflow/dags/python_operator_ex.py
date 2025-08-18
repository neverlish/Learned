from airflow import DAG
from datetime import datetime, timedelta

from airflow.models import Param
from airflow.operators.python import PythonOperator

default_args = {
    "owner": "airflow",
    "depends_on_past": False,
    "start_date": datetime(2025, 2, 1),
    "email": ["airflow@airflow.com"],
    "email_on_failure": False,
    "email_on_retry": False,
    "retries": 1,
    "retry_delay": timedelta(minutes=5),
}

dag = DAG("dag_python_operator_tutorial",
          default_args=default_args,
          schedule_interval=None,
          params={
              "branch": Param("master", type="string"),
          })


# 1. airflow에 예약되어 있는 컨텍스트 변수들 출력.
def print_context(ds, ti, params):
    print("== ti (task instance) ==")
    print(ti)
    print("== ds ==")
    print(ds)
    print("== params ==")
    print(params)

    return True


t1 = PythonOperator(task_id="print_context",
                    python_callable=print_context,
                    dag=dag)


# 2. PythonOperator에 변수를 넘기는 방법
def print_op_args(*op_args):
    print("== op_args ==")
    print(op_args)


t2 = PythonOperator(task_id="print_op_args",
                    python_callable=print_op_args,
                    op_args=['f', 'a', 's', 't'],
                    dag=dag)


def print_op_kwargs(**op_kwargs):
    print("== op_kwargs ==")
    print(op_kwargs)
    print(op_kwargs["fast"])


t3 = PythonOperator(task_id="print_op_kwargs",
                    python_callable=print_op_kwargs,
                    op_kwargs={"fast": "campus"},
                    dag=dag)


# 3. PythonOperator 간에 정보를 주고 받는 방법 : Xcom 사용

def return_xcom():
    return "abc"


xcom_return_task = PythonOperator(
    task_id="return_xcom",
    python_callable=return_xcom,
    dag=dag
)


def xcom_push_test(ti):
    # ti : task_instance, context["task_instance"] 와 동일.
    xcom_value = "xcom_campus"
    ti.xcom_push(key="xcom_fast", value=xcom_value)


xcom_push_task = PythonOperator(
    task_id="xcom_push_task",
    python_callable=xcom_push_test,
    dag=dag
)


def xcom_pull_test(ti):
    xcom_return = ti.xcom_pull(task_ids='return_xcom')
    xcom_push_value = ti.xcom_pull(key="xcom_fast")

    print(f"xcom_return : {xcom_return}")
    print(f"xcom_push_value : {xcom_push_value}")


xcom_pull_task = PythonOperator(
    task_id="xcom_pull_task",
    python_callable=xcom_pull_test,
    dag=dag
)


def xcom_pull_jinja_test(**op_kwargs):
    print(f"xcom_return : {op_kwargs['xcom_return']}")
    print(f"xcom_push_value : {op_kwargs['xcom_push_value']}")


xcom_pull_jinja_task = PythonOperator(
    task_id="xcom_pull_jinja_task",
    python_callable=xcom_pull_jinja_test,
    dag=dag,
    op_kwargs={
        "xcom_return": "{{ ti.xcom_pull(task_ids='return_xcom') }}",
        "xcom_push_value": "{{ ti.xcom_pull(key='xcom_fast') }}",
    }
)


# 4. callback 함수

def success_func():
    return True


def success_callback(context):
    print(f"success_callback function triggered, run_id: {context['run_id']}")
    # ex) 잡 성공 시 소요 시간 등 태스크의 메트릭 정보를 모니터링 서비스에 전달


success_callback_task = PythonOperator(
    task_id="success_callback_test",
    python_callable=success_func,
    on_success_callback=success_callback,
)


def failure_func():
    raise Exception()


def failure_callback(context):
    print(f"failure_callback function triggered, run_id: {context['run_id']}")
    # ex) 잡이 실패했을 때 슬랙 채널에 알람을 보냄.


failure_callback_task = PythonOperator(
    task_id="failure_callback_test",
    python_callable=failure_func,
    on_failure_callback=failure_callback,
)

(t1 >> t2 >> t3 >> xcom_return_task >> xcom_push_task >> xcom_pull_task >> xcom_pull_jinja_task
 >> success_callback_task >> failure_callback_task)