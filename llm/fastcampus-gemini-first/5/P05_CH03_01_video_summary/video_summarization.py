import json
import time
import base64

import streamlit as st
import vertexai
from vertexai.preview.generative_models import GenerativeModel, Part, Image

vertexai.init()


def summarize(video):
    model = GenerativeModel("gemini-1.5-flash")
    responses = model.generate_content(
        [video, "이 영상을 bullet point 사용해서 3줄로 요약해줘"],
        generation_config={
            "max_output_tokens": 2048,
            "temperature": 0.4,
            "top_p": 1,
            "top_k": 32,
        },
    )
    return responses.text


with st.sidebar:
    st.title("🎥 동영상 요약 서비스")
    file = st.file_uploader("동영상 업로드")
    st.info("최대 동영상 길이: 2분")

    start = st.button("요약 시작")


if file:
    st.video(file)

if start:

    with st.container(border=True):

        if file:
            with st.spinner("영상 요약중..."):
                video_encoded = base64.b64encode(file.read())
                video = Part.from_data(
                    data=video_encoded.decode("utf-8"), mime_type="video/mp4"
                )
                text = summarize(video)
            st.markdown(text)
