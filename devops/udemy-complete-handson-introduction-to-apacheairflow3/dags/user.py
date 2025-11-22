from airflow.sdk import asset, Asset, Context

@asset(
    schedule='@daily',
    uri='https://randomuser.me/api'
)
def user(self) -> dict[str]:
    import requests

    r = requests.get(self.uri)
    return r.json()

@asset(
    schedule=user
)
def user_location(user: Asset, context: Context) -> dict[str]:
    user_data = context['ti'].xcom_pull(
        dag_id=user.name,
        task_ids=user.name,
        include_prior_dates=True
    )

    return user_data['results'][0]['location']

@asset(
    schedule=user
)
def user_login(user: Asset, context: Context) -> dict[str]:
    user_data = context['ti'].xcom_pull(
        dag_id=user.name,
        task_ids=user.name,
        include_prior_dates=True
    )
    return user_data['results'][0]['login']