import pynecone as pc


class NewsConfig(pc.Config):
    pass


config = NewsConfig(
    app_name="news",
    db_url="sqlite:///pynecone.db",
    api_url="http://52.78.158.99:8000",
    env=pc.Env.DEV,
)
