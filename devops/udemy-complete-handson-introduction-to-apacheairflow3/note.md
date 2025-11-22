# 2 Getting Started with Airflow

## 14 Installing Apache Airflow
- uv venv --python 3.11
- source .venv/bin/activate
- uv pip install apache-airflow==3.0.0
- docker compose up

# 4 Coding Your First Data Pipeline with Airflow
## 25 The secret weapon!
- inside docker container `udemy-complete-handson-introduction-to-apacheairflow3-airflow-scheduler-1`
    - (airflow)/bin/bash
    - airflow@beaf462fa0c5:/opt/airflow$ airflow tasks test user_processing create_table

# 5 Creating DAGs with Assets!
## 37 Materialize an Asset
- /bin/bash
- airflow assets materialize --name user

# 6 Databases and Executors
## 42 The default configuration
- inside docker container `udemy-complete-handson-introduction-to-apacheairflow3-airflow-scheduler-1`
    - files tab
    - /opt/airflow/config/airflow.cfg

## 47 Monitoring your tasks with Flower
- docker compose --profile flower up
    - http://localhost:5555