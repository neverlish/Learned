"""Welcome to Pynecone! This file outlines the steps to create a basic app."""
from typing import List

import pynecone as pc
from pydantic import BaseModel, Field

from langchain.chat_models import ChatOpenAI
from langchain.agents import initialize_agent

from langchain.utilities import DuckDuckGoSearchAPIWrapper
from langchain.agents.tools import Tool
from langchain.prompts.chat import (
    ChatPromptTemplate,
    SystemMessagePromptTemplate,
    HumanMessagePromptTemplate,
)
from langchain import LLMChain
from langchain.agents import AgentType

# import os
# openai.api_key = os.environ["OPENAI_API_KEY"]
# openai.api_key = "YOUR_API_KEY"


llm = ChatOpenAI(temperature=0.1)

# Tools
search = DuckDuckGoSearchAPIWrapper()

## Custom Tool
template = "You are a helpful assistant that translates english to korean"
system_message_prompt = SystemMessagePromptTemplate.from_template(template)
human_template = "{text}"
human_message_prompt = HumanMessagePromptTemplate.from_template(human_template)
chat_prompt = ChatPromptTemplate.from_messages([system_message_prompt, human_message_prompt])

translation_chain = LLMChain(llm=llm, prompt=chat_prompt)


tools = [       
        Tool(
            name="search",
            func=search.run,
            description="시사에 관한 질문에 답해야 할 때 유용합니다. 타겟팅된 질문을 해야 합니다.",
        ),
        Tool(
            name="translator",
            func=translation_chain.run,
            description="영어를 한국어로 번역합니다.",
        ),
        ]


agent = initialize_agent(tools, llm, agent=AgentType.CHAT_ZERO_SHOT_REACT_DESCRIPTION, verbose=True)


class State(pc.State):
    """The app state."""

    contents: List[str] = []
    is_working: bool = False

    async def handle_submit(self, form_data):
        self.is_working = True
        yield

        topic = form_data['topic']
        for _ in range(3):
            content = agent.run(f"{topic}에 관해 시장 조사 하나하고 요약해서 한국어로 번역해줘")
            self.contents.append(content)
            yield

        self.is_working = False


def card_content(content):
    return pc.card(pc.text(content))


def index() -> pc.Component:
    return pc.center(
        pc.vstack(
            pc.heading("시장 조사 서비스", font_size="2em"),
            pc.form(
                pc.input(placeholder="topic", id="topic"),
                on_submit=State.handle_submit,
            ),
            pc.cond(State.is_working,
                pc.spinner(
                    color="lightgreen",
                    thickness=5,
                    speed="1.5s",
                    size="xl",
                ),),
            pc.ordered_list(
                pc.foreach(State.contents, card_content),
                spacing="1.5em"
            ),

            width="80%",
            font_size="1em",
        ),
        padding_top="10%",
    )


# Add state and page to the app.
app = pc.App(state=State)
app.add_page(index)
app.compile()
