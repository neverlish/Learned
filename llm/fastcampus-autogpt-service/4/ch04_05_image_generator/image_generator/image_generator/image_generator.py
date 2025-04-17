from typing import List
import os
import pynecone as pc
from glob import glob

from image_generator.autogpt import create_autogpt

import asyncio

# import os
# openai.api_key = os.environ["OPENAI_API_KEY"]
# openai.api_key = "YOUR_API_KEY"



class State(pc.State):
    """The app state."""
    is_working: bool = False

    @pc.var
    def img_path_list(self) -> List[str]:
        return ["imgs/" + os.path.basename(path) for path in glob("./assets/imgs/*.*")]

    async def handle_submit(self, form_data):
        self.is_working = True
        yield

        user_input = form_data["user_input"]

        autogpt = create_autogpt()

        goal = f"{user_input} 그려서 assets/imgs dir에 3개 저장해줘"

        async def run_autogpt():
            autogpt.run([goal])

        await run_autogpt()

        self.is_working = False


def index() -> pc.Component:
    return pc.center(
        pc.vstack(
            pc.heading("AI 이미지 자동 생성기", font_size="2em"),
            pc.form(
                pc.input(placeholder="어떤 그림을 원하세요?", id="user_input"),
                pc.button("Submit", type_="submit"),
                on_submit=State.handle_submit),
            pc.cond(State.is_working,
                    pc.spinner(
                        color="lightgreen",
                        thickness=5,
                        speed="1.5s",
                        size="xl",
                    ),),
            pc.wrap(pc.foreach(State.img_path_list,
                               lambda img_path: pc.wrap_item(
                                   pc.image(src=img_path, h="360px")),
                               ),

                    width="100%"),

            spacing="1.5em",
            font_size="1em",
            width="80%"
        ),
        padding_top="10%",
    )


# Add state and page to the app.
app = pc.App(state=State)
app.add_page(index)
app.compile()
