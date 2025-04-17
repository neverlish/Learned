import pynecone as pc

class TranslatorConfig(pc.Config):
    pass

config = TranslatorConfig(
    app_name="translator",
    db_url="sqlite:///pynecone.db",
    env=pc.Env.DEV,
)