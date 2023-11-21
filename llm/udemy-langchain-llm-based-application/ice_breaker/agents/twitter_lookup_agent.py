from langchain.prompts import PromptTemplate
from langchain.chat_models import ChatOpenAI
from langchain.agents import initialize_agent, Tool, AgentType

from tools.tools import get_profile_url

def lookup(name: str) -> str:
  llm = ChatOpenAI(temperature=0, model_name="gpt-3.5-turbo")
  template = """given the full name {name_of_person} I want you to get it me a link to their Linkedin profile page.
                          Your answer should contain only a URL"""
  tools_for_agent_twitter = [
    Tool(
      name="Crawl Google 4 Twitter profile page",
      func=get_profile_url,
      description="useful for when you need get the Twitter Page URL",
    ),
  ]

  agent = initialize_agent(
    tools_for_agent_twitter,
    llm,
    agent=AgentType.ZERO_SHOT_REACT_DESCRIPTION,
    verbose=True,
  )
  prompt_template = PromptTemplate(
    input_variables=["name_of_person"], template=template
  )

  twitter_username = agent.run(prompt_template.format_prompt(name_of_person=name))

  return twitter_username