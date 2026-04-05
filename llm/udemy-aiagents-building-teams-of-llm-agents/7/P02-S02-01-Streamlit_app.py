# Cheatsheet: https://cheat-sheet.streamlit.app/

import streamlit as st
from autogen import ConversableAgent

llm_config = {
    "model": "gpt-3.5-turbo", 
    }

jack = ConversableAgent(
    "Jack",
    llm_config=llm_config,
    system_message="Your name is Jack and you are a stand-up comedian in a two-person comedy show.",
)
rose = ConversableAgent(
    "Rose",
    llm_config=llm_config,
    system_message="Your name is Rose and you are a stand-up comedian in a two-person comedy show.",
)

initial_msg = st.text_input("How should Jack initiate the exchange with Rose?")
hit_button = st.button('Jokes ON')

print(initial_msg)

if hit_button is True:

    with st.spinner("Preparing the jokes...."):
        chat_result = jack.initiate_chat(
            rose, 
            message=initial_msg, 
            max_turns=2
            )
        
    for msg in chat_result.chat_history:
        st.markdown((":orange[jack]" if msg["role"] == "assistant" else ":red[rose]"))
        st.markdown(msg["content"] + "\n\n\n" )

