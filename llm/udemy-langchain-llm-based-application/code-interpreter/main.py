from dotenv import load_dotenv
from langchain.agents import AgentType
from langchain_experimental.agents.agent_toolkits.python.base import create_python_agent
from langchain_experimental.agents.agent_toolkits.csv.base import create_csv_agent
from langchain_community.chat_models import ChatOpenAI
from langchain_experimental.tools import PythonREPLTool

load_dotenv()

def main():
    print("Start...")
    python_agent_executor = create_python_agent(
        llm=ChatOpenAI(temperature=0, model="gpt-4"),
        tool=PythonREPLTool(),
        agent_type=AgentType.ZERO_SHOT_REACT_DESCRIPTION,
        verbose=True,
        agent_executor_kwargs={"handle_parsing_errors": True},
    )

    # python_agent_executor.run(
    #     """generate and save in current working directory 15 QRcodes
    #                             that point to www.udemy.com/course/langchain, you have qrcode package installed already"""
    # )

    csv_agent = create_csv_agent(
        llm=ChatOpenAI(temperature=0, model="gpt-4"),
        path="episode_info.csv",
        agent_type=AgentType.ZERO_SHOT_REACT_DESCRIPTION,
        verbose=True,
    )

    # csv_agent.run("how many columns are there in fils episode_info.csv")
    csv_agent.run("which writer wrote the most episodes? how many episodes did he write?")


if __name__ == "__main__":
    main()
