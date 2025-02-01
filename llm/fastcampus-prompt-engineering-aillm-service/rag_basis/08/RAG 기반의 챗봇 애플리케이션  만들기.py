import streamlit as st
from langchain.chat_models import ChatOpenAI
from langchain.chains import LLMChain
from langchain.prompts import PromptTemplate
from decouple import config
from langchain.memory import ConversationBufferMemory
import os

prompt = PromptTemplate(
  input_variables=['chat_history', 'question'],
  template="""Yoou are a AI assistant. You are
  currently having a conversation with a human. Answer the questions.
  
  chat_history: {chat_history}
  Human: {question}
  AI: """
)

llm = ChatOpenAI(
  temperature=0,
  model_name='gpt-4-0613'
)

memory = ConversationBufferMemory(memory_key='chat_history', k=4)

llm_chain = LLMChain(
  llm=llm,
  memory=memory,
  prompt=prompt,
)

st.title('ChatGPT AI Assistant')

if "messages" not in st.session_state.keys():
  st.session_state.messages = [
    {"role": "assistant", "content": "안녕하세요, 저는 AI Assistant입니다."}
  ]

for message in st.session_state.messages:
  with st.chat_message(message['role']):
    st.write(message['content'])

user_prompt = st.chat_input()

if user_prompt is not None:
  st.session_state.messages.append({"role": "user", "content": user_prompt})

  with st.chat_message('user'):
    st.write(user_prompt)

if st.session_state.messages[-1]["role"] != "assistant":
  with st.chat_message('assistant'):
    with st.spinner('Loading...'):
      ai_response = llm_chain.predict(question=user_prompt)
      st.write(ai_response)
  
  new_ai_message = {"role": "assistant", "content": ai_response}
  st.session_state.messages.append(new_ai_message)