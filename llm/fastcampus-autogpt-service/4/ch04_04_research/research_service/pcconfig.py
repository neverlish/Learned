import pynecone as pc

class ResearchserviceConfig(pc.Config):
    pass

config = ResearchserviceConfig(
    app_name="research_service",
    db_url="sqlite:///pynecone.db",
    env=pc.Env.DEV,
)