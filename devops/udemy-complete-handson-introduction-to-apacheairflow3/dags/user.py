from airflow.sdk import asset

@asset(
    schedule='@daily',
    uri='https://randomuser.me/api'
)
def user(self) -> dict[str]:
    import requests

    r = requests.get(self.uri)
    return r.json()
