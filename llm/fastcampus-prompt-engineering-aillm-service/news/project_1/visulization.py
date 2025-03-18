import streamlit as st
import pandas as pd
from pymongo import MongoClient

client = MongoClient(host="localhost", port=27017)
db = client["project1"]
collection = db["NewsAnalysis1"]

data = list(collection.find())

sentiments = []

for item in data:
    sentiments.extend(item["sentiments"])

df = pd.DataFrame(sentiments)

df["seendate"] = pd.to_datetime(df["seendate"])

st.title("기업별 날짜에 따른 감성 지수 변화")

organization = st.selectbox("기업을 선택하세요", ["Microsoft", "Apple"])


selected_df = df.loc[df["organization"] == organization].set_index("seendate")

st.line_chart(selected_df[["positive", "negative", "neutral"]])
