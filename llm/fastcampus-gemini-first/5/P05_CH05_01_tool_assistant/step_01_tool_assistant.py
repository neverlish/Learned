# pip install langchainhub
# pip install langchain-experimental
# pip install gradio-tools

import random

from langchain import hub
from langchain.agents import AgentExecutor, create_json_chat_agent
from langchain.tools import tool

from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_community.utilities import GoogleSearchAPIWrapper

from langchain_experimental.tools.python.tool import PythonREPLTool

from gradio_tools.tools import (
    StableDiffusionTool,
    TextToVideoTool,
)


@tool
def where_cat_is_hiding() -> str:
    """Where is the cat hiding right now?"""
    return random.choice(["under the bed", "on the shelf"])


@tool
def get_items(place: str) -> str:
    """Use this tool to look up which items are in the given place."""
    if "bed" in place:  # For under the bed
        return "socks, shoes and dust bunnies"
    if "shelf" in place:  # For 'shelf'
        return "books, penciles and pictures"
    else:  # if the agent decides to ask about a different place
        return "cat snacks"


model = ChatGoogleGenerativeAI(
    model="gemini-1.5-pro", convert_system_message_to_human=True
)


# Get the prompt to use - you can modify this!
prompt = hub.pull("hwchase17/react-chat-json")
print(prompt.messages)  #  -- to see the prompt
python_repr = PythonREPLTool()
# sdt = StableDiffusionTool()
# ttv = TextToVideoTool()
python_repr = PythonREPLTool()

tools = [python_repr, where_cat_is_hiding, get_items]


agent = create_json_chat_agent(model, tools, prompt)

# Create an agent executor by passing in the agent and tools
agent_executor = AgentExecutor(
    agent=agent, tools=tools, verbose=True, handle_parsing_errors=True
)


for chunk in agent_executor.stream({"input": input("입력하세요: ")}):
    # Agent Action
    if "actions" in chunk:
        for action in chunk["actions"]:
            print(f"Calling Tool: `{action.tool}` with input `{action.tool_input}`")
    # Observation
    elif "steps" in chunk:
        for step in chunk["steps"]:
            print(f"Tool Result: `{step.observation}`")
    # Final result
    elif "output" in chunk:
        print(f'Final Output: {chunk["output"]}')
    else:
        raise ValueError()
    print("---")
