import streamlit as st
import pandas as pd

data = [
    {
        "기업명": "삼성전자",
        "날짜": "2024-03-02",
        "문서 카테고리": "인수합병",
        "요약": "삼성전자가 HVAC(냉난방공조) 사업 인수를 타진 중이며, 이는 기존 가전 사업의 약점 보완을 목적으로 한다.",
        "주요 이벤트": ["기업 인수합병"],
    },
    {
        "기업명": "삼성전자",
        "날짜": "2024-03-24",
        "문서 카테고리": "인수합병",
        "요약": "테스트 하나 둘 셋",
        "주요 이벤트": ["신제품 출시"],
    },
    {
        "기업명": "현대차",
        "날짜": "2024-04-02",
        "문서 카테고리": "인수합병",
        "요약": "삼성전자가 HVAC(냉난방공조) 사업 인수를 타진 중이며, 이는 기존 가전 사업의 약점 보완을 목적으로 한다.",
        "주요 이벤트": ["기업 인수합병", "신제품 출시"],
    },
]

df = pd.DataFrame(data)
df["날짜"] = pd.to_datetime(df["날짜"])

st.sidebar.title("필터 옵션")
selected_company = st.sidebar.selectbox("기업명 선택", df["기업명"].unique())
date_range = st.sidebar.date_input(
    "날짜 범위 선택", [df["날짜"].min(), df["날짜"].max()]
)

start_date = pd.to_datetime(date_range[0])
end_date = pd.to_datetime(date_range[1])

filtered_df = df[
    (df["기업명"] == selected_company) & (df["날짜"].between(start_date, end_date))
]

grouped_df = (
    filtered_df.groupby("날짜")
    .agg(
        {
            "문서 카테고리": "first",
            "주요 이벤트": "first",
            "요약": "first",
        }
    )
    .reset_index()
)

st.title(f"{selected_company}의 문서 목록")

st.dataframe(grouped_df[["날짜", "문서 카테고리", "주요 이벤트"]])

if st.checkbox("요약 보기"):
    for idx, row in grouped_df.iterrows():
        st.subheader(f"{row['날짜']} - {row['문서 카테고리']}")
        st.write(row["요약"])
