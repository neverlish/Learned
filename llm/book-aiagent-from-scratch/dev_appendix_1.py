import streamlit as st

# 인사말 출력
st.write("안녕! 친구야")

# 텍스트 출력
st.text("이건 그냥 텍스트")
my_text = "이건 변수에 저장한 텍스트"
st.text(my_text)

# 마크다운 출력
st.markdown("어떤 글씨는 **볼드**로, 어떤 글씨는 *이탤릭*으로 표시할게.")
st.markdown("""
| 이름 | 나이 | 직업 |
|-------|------|-------------|
| 홍길동 | 25 | 개발자 |
| 김철수 | 30 | 데이터 분석가 |
| 이영희 | 28 | 디자이너 |
""")

# 제목 출력
st.title("제목")
st.header("1장")
st.subheader("1절")
st.text("안녕") # 기본 텍스트

# st.write(): 기본 텍스트 출력
st.write("이건 그냥 텍스트")
my_text = "이건 변수에 저장한 텍스트"
st.write(my_text)

# st.write(): 마크다운 출력
st.write("어떤 글씨는 **볼드**로, 어떤 글씨는 *이탤릭*으로 표시할게.")

# st.write(): 제목 출력
st.write("# 제목")
st.write("## 1장")
st.write("### 1절")
st.write("안녕")

# st.write(): 숫자 출력
st.write(123)
# st.write(): 계산 값 출력
st.write(10 + 20)
# st.write(): 리스트 출력
my_list = [1, 2, 3, 4, 5]
st.write(my_list)
# st.write(): 딕셔너리 출력
my_dict = {"이름": "홍길동", "나이": 25, "지역": "서울"}
st.write(my_dict)