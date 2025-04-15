import streamlit as st
from typing import List

from langchain_openai import ChatOpenAI
from langchain_core.prompts import ChatPromptTemplate, HumanMessagePromptTemplate
from langchain_core.output_parsers import JsonOutputParser
from langchain_core.pydantic_v1 import BaseModel, Field


class InstroList(BaseModel):
    intro_list: List[str] = Field(description="소개팅 인삿말 후보 리스트")


def generate_intro(name, age, gender, job, location, bio):
    model = ChatOpenAI(model="gpt-3.5-turbo", temperature=1.0)
    parser = JsonOutputParser(pydantic_object=InstroList)
    format_instructions = parser.get_format_instructions()

    human_prompt_template = HumanMessagePromptTemplate.from_template(
        "이름: {name}, 나이: {age}, 성별: {gender}, 직업: {job}, 지역: {location}, 자기소개: {bio}\n"
        "위 프로필을 참고해서 소개팅 앱에서 사용 할 것 같은 소개팅에 어울리는 멋진 인삿말 후보 3개 만들어줘, 짧고 간결하게\n{format_instructions}"
    )

    prompt_template = ChatPromptTemplate.from_messages(
        [
            human_prompt_template,
        ]
    )
    prompt_template = prompt_template.partial(format_instructions=format_instructions)
    intro_gen_chain = prompt_template | model | parser
    profile = {
        "name": name,
        "age": age,
        "gender": gender,
        "job": job,
        "location": location,
        "bio": bio,
    }

    out = intro_gen_chain.invoke(profile)
    return out["intro_list"]


# 앱 제목 설정
st.title("🖋️ 멋진 인사말 생성기")

# 사용자 입력 양식
with st.form("profile_form"):
    st.subheader("당신의 프로필 입력해주세요!")

    # 사용자 기본 정보 입력
    name = st.text_input("이름")
    age = st.number_input("나이", min_value=20, max_value=60, step=1)
    location = st.text_input("위치")
    gender = st.selectbox("성별", ["남성", "여성"])
    job = st.text_input("직업")
    bio = st.text_area(
        "소개",
        placeholder="자신에 대해 알려주세요. 취미, 관심사 등을 포함할 수 있습니다.",
    )

    # 폼 제출 버튼
    submitted = st.form_submit_button("인사말 생성하기")

    if submitted:
        with st.spinner("인삿말 생성중..."):
            intro_candidate_list = generate_intro(
                name=name, age=age, gender=gender, job=job, location=location, bio=bio
            )
        st.success("프로필이 생성되었습니다!")

# 사용자 프로필 표시
if submitted and name and age and location and bio:

    with st.container(border=True):
        st.subheader(f"{name}의 프로필")
        st.text(f"이름: {name}")
        st.text(f"나이: {age}")
        st.text(f"성별: {gender}")
        st.text(f"직업: {job}")
        st.text(f"위치: {location}")
        st.text(bio)

    with st.container(border=True):
        st.subheader("생성된 인삿말")
        st.markdown("\n".join([f"- {candi}" for candi in intro_candidate_list]))
