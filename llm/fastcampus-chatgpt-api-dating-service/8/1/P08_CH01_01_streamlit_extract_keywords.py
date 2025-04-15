import streamlit as st
from typing import List

from langchain_openai import ChatOpenAI
from langchain_core.prompts import ChatPromptTemplate, HumanMessagePromptTemplate
from langchain_core.output_parsers import JsonOutputParser
from langchain_core.pydantic_v1 import BaseModel, Field


class Keywords(BaseModel):
    keyword_list: List[str] = Field(description="List of keywords")


def extract_keywords(profile):
    model = ChatOpenAI(model="gpt-4-turbo-preview", temperature=0.8)
    parser = JsonOutputParser(pydantic_object=Keywords)
    format_instructions = parser.get_format_instructions()
    human_prompt_template = HumanMessagePromptTemplate.from_template(
        "{doc}\n{format_instructions}"
    )

    prompt = ChatPromptTemplate.from_messages(
        [
            human_prompt_template,
        ]
    )
    prompt = prompt.partial(format_instructions=format_instructions)

    extract_keyword_chain = prompt | model | parser
    keyword_list = extract_keyword_chain.invoke({"doc": profile})["keyword_list"]
    return keyword_list


# 앱 제목 설정
st.title("🔍 키워드 추출")

# 사용자 프로필 정보
user_name = "Liam"
user_age = 30
user_location = "서울"
user_bio = "안녕하세요, Liam입니다. 저는 서울에 거주하며, 여행, 음악 감상, 그리고 요리하는 것을 좋아합니다. 주말에는 친구들과 함께 하이킹을 즐기거나 새로운 카페를 탐방하는 것을 좋아해요. 제가 가장 좋아하는 음악 장르는 재즈와 클래식입니다. 또한, 저는 새로운 문화를 경험하고 다양한 사람들을 만나는 것에 대한 열정이 있습니다. 저는 개방적인 사고방식을 가지고 있으며, 항상 새로운 것을 배우려고 노력합니다."

# 사용자 프로필 표시
col1, col2 = st.columns([1, 3])
with col1:
    st.image("./res/man_profile.png", width=150)  # 사용자 사진

    # 좋아요와 싫어요 버튼
    if st.button("좋아요 💖"):
        st.success("좋아요를 눌렀습니다!")
    elif st.button("싫어요 👎"):
        st.error("싫어요를 눌렀습니다!")

with col2:
    st.subheader(user_name)
    st.text(f"나이: {user_age}")
    st.text(f"위치: {user_location}")
    st.markdown(user_bio)

    if st.button("키워드 추출"):
        with st.spinner("키워드 추출 중"):
            keword_list = extract_keywords(user_bio)
            st.markdown(f"**추출된 키워드: {keword_list}** ")
