from typing import List
import asyncio
import subprocess
from concurrent.futures import ProcessPoolExecutor

import pynecone as pc
from pydantic import BaseModel, Field
from langchain import LLMChain, PromptTemplate
from langchain.chat_models import ChatOpenAI
from langchain.prompts.chat import (
    ChatPromptTemplate,
    HumanMessagePromptTemplate,
)
from langchain.schema import SystemMessage
from langchain.output_parsers import PydanticOutputParser

# import os
# openai.api_key = os.environ["OPENAI_API_KEY"]
# openai.api_key = "YOUR_API_KEY"


class Chapters(BaseModel):
    chapterList: List[str] = Field(description="챕터명 리스트")


parser = PydanticOutputParser(pydantic_object=Chapters)


###########################################################
# Helpers
def build_outline_generator(llm):

    system_message = "assistant는 user가 요청한 주제에 대해 PPT를 만들기 위한 챕터명에 대한 리스트를 만들어서 출력한다."
    system_message_prompt = SystemMessage(content=system_message)

    human_template = "{subject}\n위 주제에 대해 PPT를 만들기 위한 챕터명에 대한 리스트를 한국어로 만들어서 출력해\n\n{format_instruction}"

    human_message_prompt = HumanMessagePromptTemplate(
        prompt=PromptTemplate(template=human_template,
                              input_variables=["subject"],
                              partial_variables={"format_instruction": parser.get_format_instructions()}))

    chat_prompt = ChatPromptTemplate.from_messages([system_message_prompt,
                                                    human_message_prompt])
    chat_prompt.output_parser = parser

    chain = LLMChain(llm=llm, prompt=chat_prompt)

    return chain


def build_content_generator(llm):

    system_message = "assistant는 user가 요청한 챕터에 대해 챕터의 내용을 markdown 형식으로 만든다. 이 내용은 ppt로 변환될 것이다. 그것을 고려하여 적당한 분량으로 만든다"
    system_message_prompt = SystemMessage(content=system_message)

    human_template = ("주제: {subject}"
                      "모든 챕터\n"
                      "{chapter_list}\n\n"
                      "현재 챕터: {curr_chapter}\n"
                      "\n---\n"
                      "위 내용을 참조하여 현재 챕터 '{curr_chapter}'에 대해 ppt 내용을 markdown 형식으로 만들어라."
                      "- 한국어로 만들어라."
                      "- 페이지 구분은 --- 을 활용하라"
                      "- 소제목 단위로 페이지를 구분하라"
                      )

    human_message_prompt = HumanMessagePromptTemplate.from_template(
        human_template)

    chat_prompt = ChatPromptTemplate.from_messages([system_message_prompt,
                                                    human_message_prompt])

    chat_prompt.output_parser = parser

    chain = LLMChain(llm=llm, prompt=chat_prompt)

    return chain


def task(subject, chapter_list, curr_chapter):

    content = content_generator.run(subject=subject,
                                    chapter_list='\n'.join(
                                        [f'- {chapter}' for chapter in chapter_list]),
                                    curr_chapter=curr_chapter)
    return content


###########################################################
# Instances
llm = ChatOpenAI(temperature=0.8)

outline_generator = build_outline_generator(llm)
content_generator = build_content_generator(llm)

import json


class State(pc.State):
    """The app state."""

    is_working: bool = False
    subject: str = ""
    outline: str = ""
    data: List[List[str]] = []  # [(chapter, content), ...]

    async def handle_submit(self):
        self.is_working = True
        yield

        subject = self.subject
        parsed = outline_generator.run(subject=subject)
        chapter_list = json.loads(parsed)['chapterList']
        self.outline = "# 목차\n" + '\n'.join([f'- {ch}' for ch in chapter_list])
        yield
        print(chapter_list)

        with ProcessPoolExecutor() as executor:
            for curr_chapter in chapter_list:
                content = await asyncio.get_running_loop().run_in_executor(executor, task,
                                                                           subject,
                                                                           chapter_list,
                                                                           curr_chapter)

                print("*"*30)
                print(subject)
                print(curr_chapter)
                print(content)
                self.data.append((curr_chapter, content))
                yield

        self.is_working = False

    async def save_as_ppt(self):
        self.is_working = True
        yield
        await asyncio.sleep(0.5)

        content_list = [content for _, content in self.data]

        full_content = '\n\n---\n\n'.join(content_list)

        with open("output.md", "wt") as f:
            f.write(full_content)

        command = f"marp output.md -o assets/output.pptx"
        process = subprocess.Popen(command, shell=True, stdout=subprocess.PIPE)
        process.wait()
        print("done!")
        self.is_working = False


def index() -> pc.Component:
    return pc.center(
        pc.vstack(
            pc.heading("PPT 생성 AI 서비스", font_size="2em"),
            pc.input(placeholder="subject", on_blur=State.set_subject),
            pc.hstack(
                pc.button("시작", on_click=State.handle_submit),
                pc.button("ppt로 저장하기", on_click=State.save_as_ppt),

                pc.button("download", on_click=pc.redirect(
                    "/output.pptx"
                ))
            ),
            pc.cond(State.is_working,
                    pc.spinner(
                        color="lightgreen",
                        thickness=5,
                        speed="1.5s",
                        size="xl",
                    ),),
            pc.vstack(
                pc.cond(State.outline,
                        pc.card(body=pc.markdown(State.outline),
                                width="100%")),
                pc.foreach(
                    State.data,
                    lambda data: pc.card(body=pc.markdown(data[1]),
                                         width="100%")
                ),

                width="100%",
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
