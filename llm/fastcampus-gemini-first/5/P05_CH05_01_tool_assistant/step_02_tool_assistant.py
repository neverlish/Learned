import time
import json

import streamlit as st

from langchain import hub
from langchain_core.messages import HumanMessage, AIMessage
from langchain.memory import ConversationBufferMemory
from langchain_google_genai import ChatGoogleGenerativeAI

from langchain.agents import AgentExecutor, create_json_chat_agent
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_community.utilities import GoogleSearchAPIWrapper
from langchain_experimental.tools.python.tool import PythonREPLTool
from langchain.tools import Tool

from gradio_tools.tools import (
    StableDiffusionTool,
    TextToVideoTool,
)


ALL_TOOL_NAMES = ["Python_REPL", "StableDiffusionTool", "Search"]


def init_agent_executor(selected_tool_name_list):
    prompt = hub.pull("hwchase17/react-chat-json")

    python_repr = PythonREPLTool()
    search = GoogleSearchAPIWrapper()

    search_tool = Tool(
        name="Search",
        description="Search Google for recent results.",
        func=search.run,
    )
    # sdt = StableDiffusionTool()
    # ttv = TextToVideoTool()

    tools = [python_repr, search_tool]

    selected_tools = [tool for tool in tools if tool.name in selected_tool_name_list]

    agent = create_json_chat_agent(model, selected_tools, prompt)

    # Create an agent executor by passing in the agent and tools
    agent_executor = AgentExecutor(
        agent=agent, tools=selected_tools, verbose=True, handle_parsing_errors=True
    )
    st.session_state.agent_executor = agent_executor


if "model" not in st.session_state:
    st.session_state.model = ChatGoogleGenerativeAI(
        model="gemini-1.5-pro", convert_system_message_to_human=True
    )
model = st.session_state.model


if "messages" not in st.session_state:
    st.session_state.messages = []
messages = st.session_state.messages

if "selected_tool_name_list" not in st.session_state:
    st.session_state.selected_tool_name_list = ALL_TOOL_NAMES


if "agent_executor" not in st.session_state:
    init_agent_executor(ALL_TOOL_NAMES)


def update_selected_too_list(tool_name_list):
    st.session_state.selected_tool_name_list = tool_name_list
    init_agent_executor(tool_name_list)


with st.sidebar:
    st.title("Tool AI Agent")

    selected_tool_name_list = st.multiselect(
        "tools",
        options=ALL_TOOL_NAMES,
        default=st.session_state.selected_tool_name_list,
    )

    if selected_tool_name_list != st.session_state.selected_tool_name_list:
        update_selected_too_list(selected_tool_name_list)


for msg in messages:
    role = msg["role"]
    content = msg["content"]
    st.chat_message(role).markdown(content)


if user_input := st.chat_input("Ask me anything"):

    st.session_state.messages.append({"role": "user", "content": user_input})

    with st.chat_message("user"):
        st.markdown(user_input)

    with st.chat_message("assistant"):
        for chunk in st.session_state.agent_executor.stream({"input": user_input}):
            # Agent Action
            if "actions" in chunk:
                for action in chunk["actions"]:
                    text = f"`{action.tool}` 실행중`"
                    st.markdown(text)
                    if action.tool == "Python_REPL":
                        text = f"```python\n{action.tool_input}\n```"
                        st.markdown(text)
                    else:
                        text = f"```\n{action.tool_input}\n```"
                        st.markdown(text)

            # Observation
            elif "steps" in chunk:
                for step in chunk["steps"]:
                    text = f"출력: `{step.observation}`"
                    st.markdown(text)
            # Final result
            elif "output" in chunk:
                st.markdown(f'Final Output: {chunk["output"]}')
                st.session_state.messages.append(
                    {"role": "assistant", "content": chunk["output"]}
                )
            else:
                raise ValueError()
