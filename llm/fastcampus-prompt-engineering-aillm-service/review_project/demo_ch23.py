import streamlit as st
from ch2.inference import inference_json
from ch3.inference import inference_function_calling
import pandas as pd
import ssl

ssl._create_default_https_context = ssl._create_unverified_context

url = 'https://github.com/e9t/nsmc/raw/refs/heads/master/ratings_test.txt'
df = pd.read_csv(url, sep='\t')
review = st.selectbox('리뷰', df.iloc[:10]['document'])

if st.button('submit'):
    score = inference_json(review)
    keywords = inference_function_calling(review)
    
    st.write(score)
    st.write(keywords)

