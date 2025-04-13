from PIL import Image
import io
import streamlit as st
import google.generativeai as genai

with st.sidebar:

    select_model = st.selectbox("Select model", ["gemini-pro-vision", "gemini-1.5-pro"])

    uploaded_image = None
    if select_model == "gemini-pro-vision":
        uploaded_image = st.file_uploader(
            "upload image",
            label_visibility="collapsed",
            accept_multiple_files=False,
            type=["png", "jpg"],
        )
        st.caption(
            "Note: `gemini-pro-vision` 모델은 멀티턴 대화에 최적화 되어있지 않습니다."
        )

        if uploaded_image:
            image_bytes = uploaded_image.read()


def get_response(messages, model="gemini-1.5-pro"):
    model = genai.GenerativeModel(model)
    res = model.generate_content(
        messages, stream=True, safety_settings={"HARASSMENT": "block_none"}
    )
    return res


st.title("Multi-modal AI Assistant")

if "messages" not in st.session_state:
    st.session_state["messages"] = []
messages = st.session_state["messages"]

if select_model == "gemini-pro-vision":
    if uploaded_image:
        st.image(uploaded_image)

for msg in messages:
    role = msg["role"]
    parts = msg["parts"]

    if role == "user":
        st.chat_message("user").markdown(parts[0])
    elif role == "model":
        st.chat_message("assistant").markdown(parts[0])


chat_message = st.chat_input("Say something")

if chat_message:
    st.chat_message("user").markdown(chat_message)
    ai_chat_placeholder = st.chat_message("assistant").empty()

    messages.append(
        {"role": "user", "parts": [chat_message]},
    )

    if select_model == "gemini-pro-vision" and "image_bytes" in globals():
        vision_message = [chat_message, Image.open(io.BytesIO(image_bytes))]
        res = get_response(vision_message, model="gemini-pro-vision")
    else:
        res = get_response(messages)

    res_text = ""
    for chunk in res:
        res_text += chunk.text
        ai_chat_placeholder.markdown(res_text)

    messages.append({"role": "model", "parts": [res_text]})
