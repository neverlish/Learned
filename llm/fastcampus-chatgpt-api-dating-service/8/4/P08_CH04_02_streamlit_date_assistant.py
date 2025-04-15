from openai import OpenAI
import streamlit as st
import pandas as pd

from langchain_openai import ChatOpenAI
from langchain_core.prompts import ChatPromptTemplate, HumanMessagePromptTemplate
from langchain_core.output_parsers import JsonOutputParser
from langchain_core.pydantic_v1 import BaseModel, Field


# streamlit window wide로
st.set_page_config(layout="wide")


st.header("💬 데이팅 어시스턴트")


USER_NAME = "철수"
AI_NAME = "수연"


def get_suggestion(messages, num_candi=5):

    conv = ""
    for message in messages[1:]:
        name = USER_NAME if message["role"] == "user" else AI_NAME
        conv += f"{name}: {message['content']}"

    eval_model = ChatOpenAI(
        model="gpt-4-1106-preview", temperature=0.8
    )  # CoT 는 다양한 샘플을 만들어야하기 때문에 temperature를 올려야함
    basic_model = ChatOpenAI(
        model="gpt-3.5-turbo", temperature=0.8
    )  # CoT 는 다양한 샘플을 만들어야하기 때문에 temperature를 올려야함

    class Suggestion(BaseModel):
        sentiment: str = Field(description="대화의 분위기: Positive, Negative, Neutral")
        suggestion_text: str = Field(
            description="대화에 대한 markdown형식의 자세한 분석과 적절한 조언"
        )

    parser = JsonOutputParser(pydantic_object=Suggestion)
    format_instructions = parser.get_format_instructions()

    human_prompt_template = HumanMessagePromptTemplate.from_template(
        "{conv}\n위 대화 내용은 소개팅 상황에서 처음 만나는 남녀의 대화이다. 위 대화를 분석하고 {name}에게 markdown형식으로 적절한 조언을 하라.\n{format_instructions}"
    )

    suggestion_gen_prompt = ChatPromptTemplate.from_messages(
        [
            human_prompt_template,
        ]
    )
    suggestion_gen_prompt = suggestion_gen_prompt.partial(
        format_instructions=format_instructions
    )

    suggestion_gen_chain = suggestion_gen_prompt | basic_model | parser

    class VoteCoT(BaseModel):
        thought: str = Field(
            description="voting number를 선택한 이유에 대해 자세히 넣어주세요."
        )
        voting_num: int = Field(description="voting number")

    parser = JsonOutputParser(pydantic_object=VoteCoT)
    format_instructions = parser.get_format_instructions()

    voting_prompt_template = HumanMessagePromptTemplate.from_template(
        "{conv}\n다음은 위 소개팅 대화에서 {name}에게 하면 좋을 조언이다. 아래의 후보 중 가장 좋은 것을 추론 과정과 함께 투표 번호를 응답하라.\n{candidates}\n{format_instructions}"
    )

    voting_prompt = ChatPromptTemplate.from_messages(
        [
            voting_prompt_template,
        ]
    )
    voting_prompt = voting_prompt.partial(format_instructions=format_instructions)
    voting_chain = voting_prompt | eval_model | parser

    suggestion_list = suggestion_gen_chain.batch(
        [{"conv": conv, "name": USER_NAME}] * num_candi
    )

    yield "## Suggestion candidates\n"
    yield "\n---\n".join(
        [
            f"- {i} th\n- {sug['sentiment']}\n- {sug['suggestion_text']}\n"
            for i, sug in enumerate(suggestion_list)
        ]
    )

    candidates = "\n\n".join(
        [f"후보 {i}.\n{suggestion}" for i, suggestion in enumerate(suggestion_list)]
    )
    vote_list = voting_chain.batch(
        [{"conv": conv, "name": USER_NAME, "candidates": candidates}] * num_candi
    )

    df = pd.DataFrame(vote_list)
    yield "## Voting\n"
    yield df
    print(df)

    best_candi_num = df["voting_num"].mode()[0]
    best_suggestion = suggestion_list[best_candi_num]

    yield "## Best Suggestion\n"
    yield f"{best_candi_num} th\n\n{best_suggestion['sentiment']}\n\n{best_suggestion['suggestion_text']}"


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
        with st.spinner("분석중..."):
            stream = get_suggestion(st.session_state.messages)
            response = st.write_stream(stream)
