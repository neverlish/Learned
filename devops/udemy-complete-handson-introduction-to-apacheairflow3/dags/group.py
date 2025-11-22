from airflow.sdk import dag, task, task_group

@dag
def group():
    @task
    def a():
        return 42
        
    @task_group(default_args={
        "retries": 2
    })
    def my_group(val: int):

        @task
        def b(my_val: int):
            print(my_val + 42)

        @task_group(default_args={
            "retries": 3
        })
        def my_nested_group():

            @task
            def c():
                print("c")

            c()

        b(val) >> my_nested_group()

    val = a()
    my_group(val)

group()