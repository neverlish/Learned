# We'll always have to start by creating a llm_config object to configure our agents
llm_config = {
    "model": "gpt-4o", 
    }

# Command Line Executor
from autogen.code_utils import create_virtual_env
from autogen.coding import CodeBlock, LocalCommandLineCodeExecutor

venv_dir = ".env_llm"
venv_context = create_virtual_env(venv_dir)

executor = LocalCommandLineCodeExecutor(
    virtual_env_context=venv_context,
    timeout=200,
    work_dir="coding",
)
print(
    executor.execute_code_blocks(code_blocks=[CodeBlock(language="python", code="import sys; print(sys.executable)")])
)

# ---

# Agent 1: Code Writer agent
from autogen import AssistantAgent

# Agent that writes code
code_writer_agent = AssistantAgent(
    name="code_writer_agent",
    llm_config=llm_config,
    code_execution_config=False,
    human_input_mode="NEVER",
)

# Code writer agent default prompt
code_writer_agent_system_message = code_writer_agent.system_message
print(code_writer_agent_system_message)


import pdb; pdb.set_trace()


# Agent 2: Code Executor agent
from autogen import ConversableAgent

# Agent that executes code
code_executor_agent = ConversableAgent(
    name="code_executor_agent",
    llm_config=False,
    code_execution_config={"executor": executor},
    human_input_mode="ALWAYS",
    default_auto_reply=
    "Please continue. If everything is done, reply 'TERMINATE'.",
)

# ---

# Coding Task
import datetime

today = datetime.datetime.now().date()

message = f"Today is {today}. "\
"Create a plot showing the normalized price of NVDA and BTC-USD for the last 5 years "\
"with their 60 weeks moving average. "\
"Make sure the code is in markdown code block, print the normalized prices, save the figure"\
" to a file asset_analysis.png and show it. Provide all the code necessary in a single python bloc. "\
"Re-provide the code block that needs to be executed with each of your messages. "\
"If python packages are necessary to execute the code, provide a markdown "\
"sh block with only the command necessary to install them and no comments."

# Let's define the chat and initiate it !
chat_result = code_executor_agent.initiate_chat(
    code_writer_agent,
    message=message
)