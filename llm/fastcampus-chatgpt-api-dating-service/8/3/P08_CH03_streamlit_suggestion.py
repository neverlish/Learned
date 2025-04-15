from openai import OpenAI
import streamlit as st

from langchain_openai import ChatOpenAI
from langchain_core.prompts import ChatPromptTemplate, HumanMessagePromptTemplate
from langchain_core.output_parsers import JsonOutputParser
from langchain_core.pydantic_v1 import BaseModel, Field

USER_NAME = "철수"
AI_NAME = "수연"


class Suggestion(BaseModel):
    sentiment: str = Field(description="대화의 분위기")
    suggestion_text: str = Field(description="추천 발화")


def get_suggestion():
    messages = st.session_state.messages

    conv = ""
    for message in messages[1:]:
        name = USER_NAME if message["role"] == "user" else AI_NAME
        conv += f"{name}: {message['content']}"

    model = ChatOpenAI(model="gpt-4-turbo-preview", temperature=1.0)
    parser = JsonOutputParser(pydantic_object=Suggestion)
    format_instructions = parser.get_format_instructions()

    human_prompt_template = HumanMessagePromptTemplate.from_template(
        "{conv}\n위 대화 내용은 소개팅 상황에서 처음 만나는 남녀의 대화이다. 위 대화를 고려하여 {name}가 이야기하면 좋을 적절한 멘트를 추천하라.\n{format_instructions}"
    )

    prompt_template = ChatPromptTemplate.from_messages(
        [
            human_prompt_template,
        ]
    )
    prompt_template = prompt_template.partial(format_instructions=format_instructions)
    suggestion_gen_chain = prompt_template | model | parser

    out = suggestion_gen_chain.invoke({"conv": conv, "name": USER_NAME})
    return out


st.title("✏️ 적절한 멘트 추천")

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


col1, col2 = st.columns(2)

user_input = st.chat_input("What is up?")
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
        with st.chat_message(name="assistant"):
            with st.spinner("Thinking..."):
                suggestion = get_suggestion()

            st.markdown(f"대화 분위기: {suggestion['sentiment']}")
            st.markdown(f"추천 발화: {suggestion['suggestion_text']}")
        st.button("다시 추천 받기")
