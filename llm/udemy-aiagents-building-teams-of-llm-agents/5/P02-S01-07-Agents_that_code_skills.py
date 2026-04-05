# We'll always have to start by creating a llm_config object to configure our agents
llm_config = {
    "model": "gpt-4o"
    }

# First skill: Get stock prices
def get_stock_prices(stock_symbols, start_date, end_date):
    """Get the stock prices for the given stock symbols between
    the start and end dates.

    Args:
        stock_symbols (str or list): The stock symbols to get the
        prices for.
        start_date (str): The start date in the format 
        'YYYY-MM-DD'.
        end_date (str): The end date in the format 'YYYY-MM-DD'.
    
    Returns:
        pandas.DataFrame: The stock prices for the given stock
        symbols indexed by date, with one column per stock 
        symbol.
    """
    import yfinance

    stock_data = yfinance.download(
        stock_symbols, start=start_date, end=end_date
    )
    return stock_data.get("Close")

# Second skill: Plot stock prices
def plot_stock_prices(stock_prices, filename):
    """Plot the stock prices for the given stock symbols.

    Args:
        stock_prices (pandas.DataFrame): The stock prices for the 
        given stock symbols.
    """
    import matplotlib.pyplot as plt

    plt.figure(figsize=(10, 5))
    for column in stock_prices.columns:
        plt.plot(
            stock_prices.index, stock_prices[column], label=column
                )
    plt.title("Stock Prices")
    plt.xlabel("Date")
    plt.ylabel("Price")
    plt.grid(True)
    plt.legend()
    plt.savefig(filename)

# Command Line Executor
from autogen.code_utils import create_virtual_env
from autogen.coding import CodeBlock, LocalCommandLineCodeExecutor

venv_dir = ".env_llm"
venv_context = create_virtual_env(venv_dir)

executor = LocalCommandLineCodeExecutor(
    virtual_env_context=venv_context,
    timeout=200,
    work_dir="coding",
    functions=[get_stock_prices, plot_stock_prices],
)
print(
    executor.execute_code_blocks(code_blocks=[CodeBlock(language="python", code="import sys; print(sys.executable)")])
)

# ---
# Agents definition

from autogen import ConversableAgent, AssistantAgent

# Agent 1:  Code Writer agent
code_writer_agent = AssistantAgent(
    name="code_writer_agent",
    llm_config=llm_config,
    code_execution_config=False,
    human_input_mode="NEVER",
)

# Let our agent know about our two functions
# Check system prompt message
code_writer_agent_system_message = code_writer_agent.system_message
# And we have to let it know through its prompts of their existence
# The executor will automatically generate a prompt for all our functions as long as they're properly documented:
print(executor.format_functions_for_prompt())
# So we can add this to the code writer agent's prompt
code_writer_agent_system_message += executor.format_functions_for_prompt()
# The complete prompt now contains additional information about our used defined functions
print(code_writer_agent_system_message)

import pdb; pdb.set_trace()

# Let's update the code writer agents's prompt:
code_writer_agent = ConversableAgent(
    name="code_writer_agent",
    system_message=code_writer_agent_system_message,
    llm_config=llm_config,
    code_execution_config=False,
    human_input_mode="NEVER",
)

# Agent 2: Code Executor agent
code_executor_agent = ConversableAgent(
    name="code_executor_agent",
    llm_config=False,
    code_execution_config={"executor": executor},
    human_input_mode="ALWAYS",
    default_auto_reply=
    "Please continue. If everything is done, reply 'TERMINATE'.",
)

# ---

# Let's run our task
import datetime
today = datetime.datetime.now().date()
chat_result = code_executor_agent.initiate_chat(
    code_writer_agent,
    message=f"Today is {today}."
"Create a plot showing the normalized price of NVDA and BTC-USD for the last 5 years. "\
"Also plot the 60 weeks moving average normalized price for each asset. "\
"Make sure the code is in markdown code block, print the normalized prices, save the figure"\
" to a file asset_analysis.png and who it. Provide all the code necessary in a single python bloc. "\
"Re-provide the code block that needs to be executed with each of your messages. "\
"If python packages are necessary to execute the code, provide a markdown "\
"sh block with only the command necessary to install them and no comments."
)