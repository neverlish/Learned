from dotenv import load_dotenv

load_dotenv()

from langchain_openai import ChatOpenAI

chat_model = ChatOpenAI()

content = "주제"

result = chat_model.invoke(content + "에 대한 시를 써줘")
print(result)