import pynecone as pc

class PptgeneratorConfig(pc.Config):
    pass

config = PptgeneratorConfig(
    app_name="ppt_generator",
    db_url="sqlite:///pynecone.db",
    env=pc.Env.DEV,
)