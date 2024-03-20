from dotenv import load_dotenv
import os
from openai import OpenAI
load_dotenv()
import streamlit as st
import time

API_KEY = os.environ['OPENAI_API_KEY']

client = OpenAI(api_key=API_KEY)

# if 'thread_id' not in st.session_state:
#   thread = client.beta.threads.create()
#   st.session_state.thread_id = thread.id

# thread_id = st.session_state.thread_id
thread_id = 'thread_whi015WD2bGamhLUiACl4qrn'
assistant_id = "asst_t0peUD7J0mUwJa4MmmAoGfpc"

thread_messages = client.beta.threads.messages.list(thread_id, order="asc")

st.header("현진건 작가님과의 대화")

for msg in thread_messages.data:
  with st.chat_message(msg.role):
    st.write(msg.content[0].text.value)

prompt = st.text_input("물어보고 싶은 것을 입력하세요!")

if prompt:
  message = client.beta.threads.messages.create(
    thread_id=thread_id,
    role="user",
    content=prompt
  )
  
  with st.chat_message(message.role):
    st.write(message.content[0].text.value)

  run = client.beta.threads.runs.create(
    thread_id=thread_id,
    assistant_id=assistant_id,
  )

  with st.spinner("응답 기다리는 중..."):

    while run.status != "completed":
      time.sleep(0.1)
      run = client.beta.threads.runs.retrieve(
        thread_id=thread_id, 
        run_id=run.id
      )

  messages = client.beta.threads.messages.list(
    thread_id=thread_id
  )

  with st.chat_message(messages.data[0].role):
    st.write(messages.data[0].content[0].text.value)