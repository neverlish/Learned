import streamlit as st
from operator import itemgetter
from langchain_openai import ChatOpenAI
from langchain.memory import ConversationBufferMemory
from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder
from langchain_core.runnables import RunnableLambda, RunnablePassthrough



st.title("🤖가상의 대화상대 만들어보기☕️")


system_prompt = """\
- 너는 20대 여성 AI 개발자이다.
- 처음 만나는 1:1 소개팅 상황이다. 커피집에서 만났다.
- 소개팅이기에 너무 도움을 주려고 대화하지 않는다. 자연스러운 대화를한다.
- 너무 적극적으로 이야기하지 않는다.
"""



if "model" not in st.session_state:
    model = ChatOpenAI()
    prompt = ChatPromptTemplate.from_messages(
        [
            ("system", system_prompt),
            MessagesPlaceholder(variable_name="chat_history"),
            ("human", "{input}"),
        ])

    memory = ConversationBufferMemory(memory_key="chat_history", return_messages=True)
    conv_chain = (
        RunnablePassthrough.assign(
            chat_history=RunnableLambda(memory.load_memory_variables) | itemgetter("chat_history")
        )
        | prompt
        | model
    )

    st.session_state.model = model
    st.session_state.memory = memory
    st.session_state.conv_chain = conv_chain

if "messages" not in st.session_state:
    st.session_state.messages = []

for msg in st.session_state.memory.load_memory_variables({})['chat_history']:
    role = 'user' if msg.type == 'human' else 'assistant'
    with st.chat_message(role):
        st.markdown(msg.content)


prompt = st.chat_input("입력하세요.")
if prompt:
    st.session_state.memory.chat_memory.add_user_message(prompt)

    with st.chat_message("user"):
        st.markdown(prompt)

    with st.chat_message("assistant"):
        message_placeholder = st.empty()
        full_response = ""
        for chunk in st.session_state.conv_chain.stream({"input": prompt}):
            full_response += (chunk.content or "")
            message_placeholder.markdown(full_response + "▌")
        message_placeholder.markdown(full_response)
    st.session_state.memory.chat_memory.add_ai_message(full_response)
