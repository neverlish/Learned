import json
from typing import List
import streamlit as st
import pandas as pd
from langchain_core.output_parsers import JsonOutputParser
from langchain_core.pydantic_v1 import BaseModel, Field
from langchain_openai import ChatOpenAI
from langchain.output_parsers import CommaSeparatedListOutputParser
from langchain.schema import StrOutputParser
from langchain.prompts import PromptTemplate
from langchain.prompts.chat import (
    ChatPromptTemplate,
    HumanMessagePromptTemplate,
)


####################################################
# Helpers


@st.cache_data
def load_conv_data():
    with open("./conv_data.json", "rt") as f:
        data = json.load(f)[0]
    return data


class CoT(BaseModel):
    thought: str = Field(description="Step-by-Step Thought Process")
    keywords: List[str] = Field(description="Answer")


def build_keyword_extractor_chain(model):
    parser = JsonOutputParser(pydantic_object=CoT)
    format_instructions = parser.get_format_instructions()

    prompt = PromptTemplate(
        template="{input}\n---\n위 대화에서 사람 이름을 제외하고, 명사 위주로 추론을 통해 적절한 키워드를 추출해줘. 한국어로 응답해.\n{format_instructions}",
        input_variables=["input"],
        partial_variables={"format_instructions": format_instructions},
    )
    chain = prompt | model | parser
    return chain


def build_affinity_chain(model):
    chat_message_prompt_template = ChatPromptTemplate.from_messages(
        [
            (
                "human",
                "{input}\n---\n위 대화에서 참가자별 발언을 몇번 했는지 분석해줘. 대화의 흐름도 분석해 주고, 등장 인물들의 호감도를 정리해서 표로 만들어줘.  ",
            )
        ]
    )

    chain = chat_message_prompt_template | model | StrOutputParser()
    return chain


####################################################
# Initialize

if "messages" not in st.session_state:
    conv_list = load_conv_data()
    st.session_state.messages = conv_list


if "model" not in st.session_state:
    st.session_state.model = ChatOpenAI(model="gpt-4-1106-preview")

if "keyword_extractor_chain" not in st.session_state:
    st.session_state.keyword_extractor_chain = build_keyword_extractor_chain(
        st.session_state.model
    )


if "affinity_chain" not in st.session_state:
    st.session_state.affinity_chain = build_affinity_chain(st.session_state.model)


if "keywords" not in st.session_state:
    st.session_state.keywords = ""

if "report" not in st.session_state:
    st.session_state.report = ""


####################################################
# Sidebar

with st.sidebar:
    st.title("🧑🏻‍💻 가상의 대화 데이터 분석 대시보드")
    st.header("대화 분석 옵션")
    flag_keyword_analysis = st.checkbox("키워드 분석")
    flag_comprehensive_analysis = st.checkbox("포괄적 대화 분석")


####################################################
# Main

st.subheader("대화")
with st.container(border=True, height=320):
    for msg in st.session_state.messages:
        role = "👩‍💻" if msg["type"] == "human" else "🧑🏻‍💻"
        with st.chat_message(role):
            st.markdown(msg["content"])


# 분석 결과 섹션 (모의 데이터)

if flag_keyword_analysis:

    st.subheader("키워드 분석")
    with st.container(border=True):
        if not st.session_state.keywords:
            with st.spinner("키워드 분석중..."):
                conv_data = load_conv_data()
                conv_text = ""
                for msg in conv_data:
                    role = "👩‍💻 지현" if msg["type"] == "human" else "🧑🏻‍💻 준호"
                    conv_text += f"{role}: {msg['content']}\n"
                st.session_state.keywords = (
                    st.session_state.keyword_extractor_chain.invoke(
                        {"input": conv_text}
                    )
                )

        st.markdown(st.session_state.keywords["thought"])
        st.markdown(
            "\n".join([f"- {k}" for k in st.session_state.keywords["keywords"][:3]])
        )

if flag_comprehensive_analysis:

    st.subheader("포괄적 대화 분석")
    with st.container(border=True):

        message_placeholder = st.empty()
        if not st.session_state.report:
            conv_data = load_conv_data()
            conv_text = ""
            for msg in conv_data:
                role = "👩‍💻 지현" if msg["type"] == "human" else "🧑🏻‍💻 준호"
                conv_text += f"{role}: {msg['content']}\n"

            full_response = ""
            for chunk in st.session_state.affinity_chain.stream({"input": conv_text}):
                full_response += chunk or ""
                message_placeholder.markdown(full_response + "▌")
            st.session_state.report = full_response

        message_placeholder.markdown(st.session_state.report)
