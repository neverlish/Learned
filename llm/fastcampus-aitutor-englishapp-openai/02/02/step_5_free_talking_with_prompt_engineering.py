import base64
import streamlit as st
from openai import OpenAI
from audio_recorder_streamlit import audio_recorder


# Init
client = OpenAI()

"""
- 너는 영어 선생님이다.
- 유저의 영어실력은 중급이다.
- 유저의 영어 실력에 맞춰서 응답해라.
- 너는 영어로만 대답을 해야한다.
---

위 내용을 영어로 번역해줘
"""

level_1_prompt = """\
- You are an English teacher.
- The user's English proficiency is at a beginner level.
- Please respond in a way that is easy for the user to understand.
- You must answer in English only.
"""

level_2_prompt = """\
- You are an English teacher.
- The user's English level is intermediate.
- Please respond according to the user's English proficiency.
- You must answer in English only.
"""

level_3_prompt = """\
- You are an English teacher.
- The user's English proficiency is advanced.
- Please respond accordingly to the user's level of English.
- You must answer in English only.
"""

level_to_prompt_map = {
    "초급": level_1_prompt,
    "중급": level_2_prompt,
    "고급": level_3_prompt,
}

if "level" not in st.session_state:
    st.session_state.level = "초급"

if "messages" not in st.session_state:
    st.session_state.messages = [
        {"role": "system", "content": level_to_prompt_map[st.session_state.level]}
    ]

if "prev_audio_bytes" not in st.session_state:
    st.session_state.prev_audio_bytes = None


# Helpers
def autoplay_audio(file_path: str):
    with open(file_path, "rb") as f:
        data = f.read()
        b64 = base64.b64encode(data).decode()
        md = f"""
            <audio controls autoplay="true">
            <source src="data:audio/mp3;base64,{b64}" type="audio/mp3">
            </audio>
            """
        st.markdown(
            md,
            unsafe_allow_html=True,
        )


# View
st.title("프리 토킹 서비스")


if st.button("새로운 대화"):
    st.session_state.messages = [
        {"role": "system", "content": level_to_prompt_map[st.session_state.level]}
    ]

option = st.selectbox("난이도", ["초급", "중급", "고급"])
if option != st.session_state.level:
    st.session_state.level = option
    st.session_state.messages = [
        {"role": "system", "content": level_to_prompt_map[st.session_state.level]}
    ]

con1 = st.container()
con2 = st.container()

user_input = ""


with con2:
    audio_bytes = audio_recorder("talk", pause_threshold=3.0)
    if audio_bytes == st.session_state.prev_audio_bytes:
        audio_bytes = None
    st.session_state.prev_audio_bytes = audio_bytes

    try:
        if audio_bytes:
            with open("./tmp_audio.wav", "wb") as f:
                f.write(audio_bytes)

            with open("./tmp_audio.wav", "rb") as f:
                transcript = client.audio.transcriptions.create(
                    model="whisper-1",
                    file=f,
                    language="en",
                )
                user_input = transcript.text

    except Exception as e:
        print(e)
        pass


with con1:
    for message in st.session_state.messages:
        with st.chat_message(message["role"]):
            st.markdown(message["content"])

    if user_input:
        st.session_state.messages.append({"role": "user", "content": user_input})

        with st.chat_message("user"):
            st.markdown(user_input)

        with st.chat_message("assistant"):
            message_placeholder = st.empty()
            full_response = ""
            for response in client.chat.completions.create(
                model="gpt-4-1106-preview",
                messages=[
                    {"role": m["role"], "content": m["content"]}
                    for m in st.session_state.messages
                ],
                stream=True,
            ):
                full_response += response.choices[0].delta.content or ""
                message_placeholder.markdown(full_response + "▌")
            message_placeholder.markdown(full_response)

            speech_file_path = "tmp_speak.mp3"
            response = client.audio.speech.create(
                model="tts-1",
                voice="alloy",  # alloy, echo, fable, onyx, nova, and shimmer
                input=full_response,
            )
            response.stream_to_file(speech_file_path)

            autoplay_audio(speech_file_path)

        st.session_state.messages.append(
            {"role": "assistant", "content": full_response}
        )
