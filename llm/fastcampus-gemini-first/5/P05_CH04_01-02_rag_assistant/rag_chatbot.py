# """
# pip install -U duckduckgo-search
# pip install -U langchain langchain-google-genai
# pip install google-api-python-client
# """
#
# """
# 먼저 적절한 API 키와 환경 변수를 설정해야 합니다.
#
# 이를 설정하려면 Google Cloud 크레덴셜 콘솔(https://console.cloud.google.com/apis/credentials)에서 GOOGLE_API_KEY를 생성하고 프로그래머블 검색 엔진(https://programmablesearchengine.google.com/controlpanel/create)을 사용하여 GOOGLE_CSE_ID를 만듭니다.
#
#
# 각각의 변수를 os.environ에 직접 설정하거나 환경변수에 설정합니다.
#
# os.environ["GOOGLE_CSE_ID"] = ""
# os.environ["GOOGLE_API_KEY"] = ""
# """

import time
import json

import streamlit as st

from langchain_core.messages import HumanMessage, AIMessage
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_community.utilities import GoogleSearchAPIWrapper


st.title("RAG기반 AI 어시스턴트")


if "model" not in st.session_state:
    st.session_state.model = ChatGoogleGenerativeAI(model="gemini-1.5-pro")
model = st.session_state.model

if "messages" not in st.session_state:
    st.session_state.messages = []
messages = st.session_state.messages

for msg in messages:
    role = msg["role"]
    content = msg["content"]
    st.chat_message(role).markdown(content)


if prompt := st.chat_input("Ask me anything"):

    with st.chat_message("user"):
        st.markdown(prompt)

        # 질의 정규화
        with st.spinner("질문을 검색어로 변화중..."):
            query = model.invoke(
                f"다음 질문을 검색어의 형태로 바꿔줘. 여러개 말고 하나만: {prompt}"
            ).content
            print(f"normalized q: {query}")

        # 검색
        with st.spinner("검색중..."):
            search = GoogleSearchAPIWrapper()
            search_result = search.run(query)
            print(search_result)

        with st.container(border=True):
            st.markdown(search_result)

    prompt = f"- `{query}`에 대한 검색 결과\n{search_result}\n{prompt}"
    print(prompt)

    st.session_state.messages.append({"role": "user", "content": prompt})

    with st.chat_message("assistant"):
        message_placeholder = st.empty()
        full_response = ""
        for ai_msg in model.stream(
            [
                (
                    HumanMessage(content=msg["content"])
                    if msg["role"] == "user"
                    else AIMessage(content=msg["content"])
                )
                for msg in messages
            ]
        ):
            full_response += ai_msg.content or ""
            message_placeholder.markdown(full_response + "▌")
        message_placeholder.markdown(full_response)
    st.session_state.messages.append({"role": "assistant", "content": full_response})
