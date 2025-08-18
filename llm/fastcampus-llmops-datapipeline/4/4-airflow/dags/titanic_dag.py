import pendulum

from airflow.decorators import dag, task
from airflow.operators.empty import EmptyOperator
from airflow.providers.mysql.hooks.mysql import MySqlHook


@dag(
    dag_id="titanic_dag",
    schedule=None,
    start_date=pendulum.datetime(2025, 2, 8),
    catchup=False,
    tags=["example"],
)
def titanic_dag():
    start = EmptyOperator(task_id="start")

    @task
    def create_table():
        mysql_hook = MySqlHook(mysql_conn_id="mysql_conn")
        sql = """
        CREATE TABLE IF NOT EXISTS titanic_data(
            PassengerId int PRIMARY KEY,
            Survived int,
            Pclass int,
            Name varchar(150),
            Sex varchar(50),
            Age varchar(10),
            SibSp int,
            Parch int,
            Ticket varchar(50),
            Fare varchar(50),
            Cabin varchar(50),
            Embarked varchar(10)
        );
        """
        mysql_hook.run(sql)

    @task
    def get_row_count():
        mysql_hook = MySqlHook(mysql_conn_id='mysql_conn')
        cur = mysql_hook.get_cursor()
        print(f"row_count: {cur.rowcount}")
        return cur.rowcount

    start >> create_table() >> get_row_count()


titanic_dag()