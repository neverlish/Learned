import pynecone as pc

class QachatbotConfig(pc.Config):
    pass

config = QachatbotConfig(
    app_name="qa_chatbot",
    db_url="sqlite:///pynecone.db",
    env=pc.Env.DEV,
)