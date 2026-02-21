import streamlit as st

# 기본 버튼 생성
button = st.button("클릭하세요")
if button:
    st.write("버튼을 클릭한 경우에만 출력하는 내용")

# 링크 바로가기 버튼 생성
st.link_button("네이버로 가기", "https://naver.com")

# 텍스트 입력 위젯
user_text = st.text_input("무슨 과일을 좋아하세요?")
if user_text:
    st.write(f"당신은 {user_text}를 좋아하는군요.")

# 채팅 입력 위젯
user_text = st.chat_input("무슨 과일을 좋아하세요?")
if user_text:
    st.write(f"당신은 {user_text}를 좋아하는군요.")

# 드롭다운 선택 위젯
option = st.selectbox("좋아하는 과일을 선택하세요.", ["사과", "바나나", "체리"])
st.write(f"선택한 과일: {option}")

# 드롭다운 다중 선택 위젯
options = st.multiselect("좋아하는 과일을 모두 선택하세요.", ["사과", "바나나", "체리"])
st.write(f"선택한 과일들: {options}")

# 파일 업로드 위젯
uploaded_file = st.file_uploader("파일을 업로드하세요.")
if uploaded_file: 
    st.write(uploaded_file.name) 
    file_content = uploaded_file.read().decode("utf-8")
    st.write(file_content) 

# 파일 다운로드 위젯
data = """여러 줄의 예제 텍스트를 작성해 다운로드 기능을 테스트합니다.
이 텍스트는 Streamlit에서 다운로드 버튼을 누르면 저장됩니다.
예제 텍스트를 다운로드해 기능을 확인해 보세요.
"""
download_button = st.download_button(
    "텍스트 다운로드",
    data = data,
    file_name = "결과.txt"
)