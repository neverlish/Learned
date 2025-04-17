import pynecone as pc

class ImagegeneratorConfig(pc.Config):
    pass

config = ImagegeneratorConfig(
    app_name="image_generator",
    db_url="sqlite:///pynecone.db",
    env=pc.Env.DEV,
)