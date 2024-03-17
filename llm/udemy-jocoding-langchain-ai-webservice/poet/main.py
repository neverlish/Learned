from dotenv import load_dotenv

load_dotenv()

from langchain_openai import ChatOpenAI, OpenAI

# llm = OpenAI()
# result = llm.invoke("내가 좋아하는 동물은 ")
# print(result)

chat_model = ChatOpenAI()
result = chat_model.invoke("hi!")
print(result)