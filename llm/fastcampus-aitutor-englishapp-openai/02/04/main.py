from typing import List
import streamlit as st
from langchain_openai import ChatOpenAI
from langchain.prompts import ChatPromptTemplate, HumanMessagePromptTemplate
from langchain.schema import StrOutputParser
from langchain_core.output_parsers import JsonOutputParser
import langchain_core.pydantic_v1 as pyd1

# Streamlit 페이지 설정
st.set_page_config(page_title="AI English Assistant", layout="wide")


class Grammar(pyd1.BaseModel):
    reason_list: List[str] = pyd1.Field(
        description="문법적으로 틀린 이유들. 만약 틀린 것이 없으면 빈 리스트. 한국어로 작성하라. 문법 오류 하나 당 이유 한개만."
    )


def build_grammar_analysis_chain(model):
    parser = JsonOutputParser(pydantic_object=Grammar)
    format_instruction = parser.get_format_instructions()

    human_msg_prompt_template = HumanMessagePromptTemplate.from_template(
        "{input}\n---\n위 영어 텍스트에 대해 문법적으로 틀린 부분 찾아서 나열해줘. 형식은 아래의 포맷을 따라라. value의 값은 한국어로 작성하라.\n{format_instruction}",
        partial_variables={"format_instruction": format_instruction},
    )

    prompt_template = ChatPromptTemplate.from_messages(
        [human_msg_prompt_template],
    )
    chain = prompt_template | model | parser
    return chain


class EnglishProficiencyScore(pyd1.BaseModel):
    vocabulary: int = pyd1.Field(
        description="어휘, 단어의 적절성 0~10점 사이로 점수를 표현해라"
    )
    coherence: int = pyd1.Field(description="일관성 0점~10점 사이로 점수를 표현해라")
    clarity: int = pyd1.Field(description="명확성 0점~3점 사이로 점수를 표현해라")
    score: int = pyd1.Field(description="총점 0점~10점 사이로 점수를 표현해라")


def build_proficiency_scoring_chain(model):
    parser = JsonOutputParser(pydantic_object=EnglishProficiencyScore)
    format_instruction = parser.get_format_instructions()

    human_msg_prompt_template = HumanMessagePromptTemplate.from_template(
        "{input}\n---\nEvaluate the overall English proficiency of the above text. Consider grammar, vocabulary, coherence, etc. Follow the format: {format_instruction}",
        partial_variables={"format_instruction": format_instruction},
    )

    prompt_template = ChatPromptTemplate.from_messages(
        [human_msg_prompt_template],
    )

    chain = prompt_template | model | parser
    return chain


class Correction(pyd1.BaseModel):
    reason: str = pyd1.Field(
        description="원래의 영어 문장이 어색하거나 잘못된 이유. 한국어로 작성하라."
    )
    correct_sentence: str = pyd1.Field(description="교정된 문장")


def build_correction_chain(model):
    parser = JsonOutputParser(pydantic_object=Correction)
    format_instruction = parser.get_format_instructions()

    human_msg_prompt_template = HumanMessagePromptTemplate.from_template(
        "{input}\n---\n위 영어 문장이 문법적으로 틀렸거나 어색한 이유를 다음의 포맷에 맞춰 응답해라.  : {format_instruction}",
        partial_variables={"format_instruction": format_instruction},
    )

    prompt_template = ChatPromptTemplate.from_messages(
        [human_msg_prompt_template],
    )

    chain = prompt_template | model | parser
    return chain


if "model" not in st.session_state:
    model = ChatOpenAI(model="gpt-4-1106-preview")
    st.session_state.model = model

if "grammar_analysis_chain" not in st.session_state:
    st.session_state.grammar_analysis_chain = build_grammar_analysis_chain(
        st.session_state.model
    )


if "proficiency_scoring_chain" not in st.session_state:
    st.session_state.proficiency_analysis_chain = build_proficiency_scoring_chain(
        st.session_state.model
    )


if "correction_chain" not in st.session_state:
    st.session_state.correction_chain = build_correction_chain(st.session_state.model)


# 메인 섹션
st.title("AI 교정 서비스")

# 사용자 입력을 위한 텍스트 에어리어
# user_input = st.text_area("Enter your text here:", value="Yesterday, I goes to the store for bought some milk.")
user_input = st.text_area("Enter your text here:")

st.button("분석하기")

grammar_analysis = None
proficiency_analysis = None
proficiency_result = None

if user_input:

    st.subheader("문법")
    with st.container(border=True):
        with st.spinner("분석중..."):
            grammar_analysis = st.session_state.grammar_analysis_chain.invoke(
                {"input": user_input}
            )

        print(grammar_analysis)

        reason_list = grammar_analysis["reason_list"]

        reason_md = "\n".join([f"- {reason}" for reason in reason_list])

        st.markdown(reason_md)

    st.subheader("교정")
    with st.container(border=True):
        with st.spinner("교정중..."):
            correction = st.session_state.correction_chain.invoke({"input": user_input})

        st.markdown(correction["reason"])

        st.subheader("교정된 문장")
        st.markdown(correction["correct_sentence"])


with st.sidebar:
    st.title("AI Assistant")

    con = st.container(border=True)

    with st.container(border=True):
        """
        **Correctness**
        """

        if user_input and grammar_analysis:
            with st.spinner("Analyzing correctness..."):
                n_wrong = len(grammar_analysis["reason_list"])

            if n_wrong:
                st.error(f"{n_wrong} alert")
            else:
                st.success("All correct!")

    if user_input:
        with st.spinner("Analyzing..."):
            proficiency_analysis = st.session_state.proficiency_analysis_chain.invoke(
                {"input": user_input}
            )

    with st.container(border=True):
        """
        **Coherence**
        """

        if user_input and proficiency_analysis:
            score = proficiency_analysis["coherence"]

            score_text = f"{score}/10"
            if score >= 8:
                st.success(score_text)
            elif 4 <= score < 8:
                st.warning(score_text)
            else:
                st.error(score_text)

    with st.container(border=True):
        """
        **Clarity**
        """

        if user_input and proficiency_analysis:
            score = proficiency_analysis["clarity"]

            score_to_text_map = {
                0: "unclear",
                1: "Somewhat unclear",
                2: "clear",
                3: "very clear",
            }
            text = score_to_text_map[score]

            if score == 3:
                st.success(text)
            elif score == 2:
                st.info(text)
            elif score == 1:
                st.warning(text)
            elif score == 0:
                st.error(text)

    with st.container(border=True):
        """
        **Vocabulary**
        """

        if user_input and proficiency_analysis:
            score = proficiency_analysis["vocabulary"]

            score_text = f"{score}/10"
            if score >= 8:
                st.success(score_text)
            elif 4 <= score < 8:
                st.warning(score_text)
            else:
                st.error(score_text)

    with con:
        """
        **Overall score**
        """

        if user_input and proficiency_analysis:
            score = proficiency_analysis["score"]

            score_text = f"{score}/10"
            if score >= 8:
                st.success(score_text)
            elif 4 <= score < 8:
                st.warning(score_text)
            else:
                st.error(score_text)
