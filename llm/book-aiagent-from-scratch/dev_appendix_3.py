import streamlit as st

# 페이지 환경 설정
st.set_page_config(
    page_title = "AI 에이전트", # 웹 페이지 제목
    page_icon = "🤖",         # 웹 페이지 아이콘
    layout = "wide",          # 웹 페이지 레이아웃: 넓게
)

# 인사말 출력
col1, col2 = st.columns(2)
with col1:
    st.write("첫 번째 열입니다.")
    st.write("안녕하세요!")
with col2:
    st.write("두 번째 열입니다.")
    st.write("반갑습니다!")