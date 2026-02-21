import streamlit as st

# 세션 상태 초기화
if "counter1" not in st.session_state:
    st.session_state.counter1 = 1
if "counter2" not in st.session_state:
    st.session_state.counter2 = 2
if "counter3" not in st.session_state:
    st.session_state.counter3 = 3

# 버튼 생성 및 세션 상태 업데이트
button1 = st.button("카운터 1: 1부터 시작해 1씩 증가")
button2 = st.button("카운터 2: 2부터 시작해 2씩 증가")
button3 = st.button("카운터 3: 3부터 시작해 3씩 증가")
if button1:
    st.session_state.counter1 = st.session_state.counter1 + 1
if button2:
    st.session_state.counter2 = st.session_state.counter2 + 2
if button3:
    st.session_state.counter3 = st.session_state.counter3 + 3

# 세션 상태 출력
st.write("카운터 1:", st.session_state.counter1)
st.write("카운터 2:", st.session_state.counter2)
st.write("카운터 3:", st.session_state.counter3)