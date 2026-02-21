import streamlit as st

# 세션 상태 초기화
if "counter" not in st.session_state:
    st.session_state.counter = 0

button = st.button("카운터 증가")

if button:
    # 세션 상태 값 증가
    st.session_state.counter = st.session_state.counter + 1

# 세션 상태 출력 
st.write(st.session_state.counter)