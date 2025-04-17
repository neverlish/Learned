import pynecone as pc

class MarketingautogptConfig(pc.Config):
    pass

config = MarketingautogptConfig(
    app_name="marketing_autogpt",
    db_url="sqlite:///pynecone.db",
    env=pc.Env.DEV,
)