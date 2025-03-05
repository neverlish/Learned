import streamlit as st
import requests
import json
from langchain_core.messages import HumanMessage
from langserve import RemoteRunnable
import pandas as pd
from streamlit_chat import message


class rag_web:
    def __init__(self):
        self.BASE_URL = "http://127.0.0.1:8000"
        self.URL_DICT = {
            "LangChain": f"{self.BASE_URL}/openai_chain/",
            "LangGraph": f"{self.BASE_URL}/openai_graph/",
        }
        self.gen_sidebar()

    def gen_sidebar(self):
        with st.sidebar:
            st.radio(
                "Select the model to use",
                ["LangChain", "LangGraph"],
                key="model",
                on_change=self.reset_log,
            )

    def get_answer_langserve(self, message):
        url = self.URL_DICT[st.session_state.model]
        lang = RemoteRunnable(url)
        result = lang.invoke(message)

        return_image = False
        source_nodes = []

        if isinstance(result, str):
            return result, source_nodes, return_image

        response = result[-1].content

        for message in result:
            if "tool_calls" in message.additional_kwargs:
                tool_name = message.additional_kwargs["tool_calls"][0]["function"][
                    "name"
                ]
                if tool_name == "retriever-llm":
                    source_nodes.append(message)
                elif tool_name == "graph_generator":
                    return_image = True

        return response, source_nodes, return_image

    def get_answer(self, message):
        if st.session_state["model"].find("Lang") > -1:
            return self.get_answer_langserve(message)

    def update_log(self, user_message, bot_message):
        if "chat_log" not in st.session_state:
            st.session_state.chat_log = {
                "user_message": [],
                "bot_message": [],
            }

        st.session_state.chat_log["user_message"].append(user_message)
        st.session_state.chat_log["bot_message"].append(bot_message)

    def display_chat_log(self):
        bot_messages = st.session_state.chat_log["bot_message"][::-1]
        user_messages = st.session_state.chat_log["user_message"][::-1]

        for idx, (bot, user) in enumerate(zip(bot_messages, user_messages)):
            message(bot, key=f"{idx}_bot")
            message(user, key=f"{idx}_user", is_user=True)

    def reset_log(self):
        st.session_state.chat_log = {
            "user_message": [],
            "bot_message": [],
        }
        st.session_state.bot_output = None, None, None

    def user_input(self):
        user_message = st.session_state.user_message
        st.session_state["user_message"] = ""
        st.session_state["bot_message"] = self.get_answer(user_message)

        self.update_log(user_message, st.session_state["bot_message"][0])

    def window_chat(self):
        st.title("My RAG Model")
        st.subheader("fastcamppus")
        st.caption("created by summer")

        st.text_input("type a message..", key="user_message", on_change=self.user_input)

        if st.button("reset"):
            self.reset_log()
            self.display_chat_log()

        if "bot_output" in st.session_state:
            response, source_nodes, return_image = st.session_state["bot_output"]
            self.display_chat_log()

            if return_image:
                st.image("../results/chain_out.png")

            source_nodes = pd.DataFrame(source_nodes)

            st.dataframe(source_nodes)


if __name__ == "__main__":
    st.set_page_config(
        page_title="FastCampus RAG-Demo",
        page_icon=":pizza:",
    )

    web = rag_web()
    web.window_chat()
