import pickle
import pandas as pd
import streamlit as st
from search_and_answer import search, generate_answer

with open('qas.pkl', 'rb') as f:
  qas = pickle.load(f)

df = pd.DataFrame(qas)
st.dataframe(df)

question = st.text_input('Question', '이벤트 언제까지에요?')

if st.button('Submit'):
  qa = search(question)
  answer = generate_answer(qa, question)
  st.write(answer)
