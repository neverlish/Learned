from dotenv import load_dotenv

load_dotenv()

from langchain_openai import ChatOpenAI
import streamlit as st

chat_model = ChatOpenAI()

st.title('인공지능 시인')

content = st.text_input('시의 주제를 제시해주세요.')

result = chat_model.invoke(content + "에 대한 시를 써줘")
print(result)