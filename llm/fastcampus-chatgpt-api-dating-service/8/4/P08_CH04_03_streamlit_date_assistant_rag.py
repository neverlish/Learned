from openai import OpenAI
import streamlit as st
import pandas as pd

from langchain_openai import ChatOpenAI
from langchain_core.prompts import ChatPromptTemplate, HumanMessagePromptTemplate
from langchain_core.runnables import RunnableLambda, RunnablePassthrough
from langchain_core.output_parsers import JsonOutputParser, StrOutputParser
from langchain_core.pydantic_v1 import BaseModel, Field

from langchain_community.vectorstores import FAISS
from langchain_openai import OpenAIEmbeddings


# streamlit window wide로
st.set_page_config(layout="wide")


if "retriever" not in st.session_state:
    vectorstore = FAISS.load_local(
        folder_path="./conv_index",
        embeddings=OpenAIEmbeddings(),
        allow_dangerous_deserialization=True,
    )
    retriever = vectorstore.as_retriever()

    st.session_state.retriever = retriever


st.header("💬 데이팅 어시스턴트")


USER_NAME = "철수"
AI_NAME = "수연"


def get_suggestion():

    model = ChatOpenAI(model="gpt-4-1106-preview", temperature=0.8)
    retriever = st.session_state.retriever

    conv = ""
    for message in st.session_state.messages[1:]:
        name = USER_NAME if message["role"] == "user" else AI_NAME
        conv += f"{name}: {message['content']}"

    template = """
    # 현재 대화
    {conv}

    # 관련 유사 대화
    {context}

    관련 유사 대화 중 하나를 출력하고 그에  대한 설명하고, 그 대화를 참고하여 현재 대화에 어울리는 조언해줘
    """
    prompt = ChatPromptTemplate.from_template(template)

    chain = (
        {"context": retriever, "conv": RunnablePassthrough()}
        | prompt
        | model
        | StrOutputParser()
    )

    suggestion = chain.stream(conv)

    return suggestion


client = OpenAI()

if "messages" not in st.session_state:
    system_prompt = f"""\
    너는 20대 여성 AI 개발자이고 아래의 프로필을 따라 응답한다.
    - 이름: 수연
    - 나이: 29
    - '처음' 만나는 1:1 소개팅 상황이다. 커피집에서 만났다.
    - 소개팅이기에 너무 도움을 주려고 대화하지 않는다. 자연스러운 대화를한다.
    - 너무 적극적으로 이야기하지는 않는다.
    - 대화를 리드하지 않는다.
    - 수동적으로 대답한다.
    """
    st.session_state.messages = [{"role": "system", "content": system_prompt}]


user_input = st.chat_input("What is up?")

col1, col2 = st.columns(2)

with col1:
    for message in st.session_state.messages[1:]:
        avatar = "🧑" if message["role"] == "user" else "👩🏼"
        with st.chat_message(avatar):
            st.markdown(message["content"])

    if user_input:
        st.session_state.messages.append({"role": "user", "content": user_input})
        with st.chat_message("🧑"):
            st.markdown(user_input)

        with st.chat_message("👩🏼"):
            stream = client.chat.completions.create(
                model="gpt-3.5-turbo",
                messages=[
                    {"role": m["role"], "content": m["content"]}
                    for m in st.session_state.messages
                ],
                stream=True,
            )
            response = st.write_stream(stream)
        st.session_state.messages.append({"role": "assistant", "content": response})

with col2:
    if len(st.session_state.messages) > 2:
        with st.spinner("유사 대화 검색중..."):
            st.write_stream(get_suggestion())
