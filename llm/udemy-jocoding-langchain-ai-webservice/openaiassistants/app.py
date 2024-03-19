from dotenv import load_dotenv
import os
from openai import OpenAI
load_dotenv()
import streamlit as st

API_KEY = os.environ['OPENAI_API_KEY']

client = OpenAI(api_key=API_KEY)

# if 'thread_id' not in st.session_state:
#   thread = client.beta.threads.create()
#   st.session_state.thread_id = thread.id

# thread_id = st.session_state.thread_id
thread_id = 'thread_whi015WD2bGamhLUiACl4qrn'
assistant_id = "asst_t0peUD7J0mUwJa4MmmAoGfpc"

thread_messages = client.beta.threads.messages.list(thread_id)

st.header("현진건 작가님과의 대화")

for msg in reversed(thread_messages.data):
  with st.chat_message(msg.role):
    st.write(msg.content[0].text.value)

prompt = st.text_input("물어보고 싶은 것을 입력하세요!")

if prompt:
  st.write(f"User has sent the following prompt: {prompt}")  