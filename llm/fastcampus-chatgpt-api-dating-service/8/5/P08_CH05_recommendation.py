import streamlit as st
from langchain_community.vectorstores import FAISS
from langchain_openai import OpenAIEmbeddings

# 페이지 구성 설정: 전체 너비로 확장
st.set_page_config(layout="wide")


if "retriever" not in st.session_state:
    vectorstore = FAISS.load_local(
        folder_path="./profile_index",
        embeddings=OpenAIEmbeddings(),
        allow_dangerous_deserialization=True,
    )
    retriever = vectorstore.as_retriever()

    st.session_state.retriever = retriever


st.title("💖 내 스타일의 이성 추천받기")


def get_profile_by_some_list(some_list):
    if not some_list:
        return []

    retriever = st.session_state.retriever

    total_profile_list = []
    for something in some_list:
        docs = retriever.invoke(something)

        for d in docs:
            total_profile_list.append(d.page_content)

    return total_profile_list


# 사용자 프로필 입력 부분
with st.form("profile_form"):
    st.write("프로필을 기반으로 한 맞춤 이성 추천")

    # 프로필 정보 입력
    interests = st.text_input("관심사", placeholder="예: 여행, 음악, 요리")

    # 좋아요 기록 입력
    liked_profiles = st.text_area(
        "좋아한 프로필 기록",
        placeholder="예: 자연을 사랑하는 사람, 유머 감각이 있는 사람",
    )

    # ChatGPT API 기반 추천 버튼
    submitted_chatgpt = st.form_submit_button("ChatGPT 추천 받기")


# 추천 결과 부분
if submitted_chatgpt:
    with st.spinner("검색중..."):

        profile_list_by_interests = get_profile_by_some_list(interests.split(","))
        profile_list_by_liked_profile = get_profile_by_some_list(
            liked_profiles.split(",")
        )

        merged_profile_list = []
        merged_profile_set = set()

        for p1, p2 in zip(profile_list_by_interests, profile_list_by_liked_profile):
            if p1 not in merged_profile_set:
                merged_profile_list.append(p1)
                merged_profile_set.add(p1)

            if p2 not in merged_profile_set:
                merged_profile_list.append(p2)
                merged_profile_set.add(p2)

        st.subheader("추천 결과")

        for profile in merged_profile_list[:5]:
            with st.container(border=True):
                st.markdown("\n".join([f"- {line}" for line in profile.split("\n")]))
