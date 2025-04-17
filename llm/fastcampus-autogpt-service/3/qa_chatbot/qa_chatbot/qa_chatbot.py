"""Welcome to Pynecone! This app is a demonstration of OpenAI's GPT."""
import os
import pynecone as pc
import openai
import datetime

# openai.api_key = "YOUR_API_KEY"
openai.api_key = os.environ["OPENAI_API_KEY"]
MAX_QUESTIONS = 10



def ask_chatgpt(text):
    system_instruction = f"assistant는 만물 박사입니다. 사용자의 질의에 자세히 대답합니다."

    messages = [{"role": "system", "content": system_instruction},
                {"role": "user", "content": text} 
                ]
    
    response = openai.chat.completions.create(model="gpt-3.5-turbo",
                                            messages=messages)
    
    assistant_text = response.choices[0].message.content
    return assistant_text



class Question(pc.Model, table=True):
    """A table for questions and answers in the database."""

    prompt: str
    answer: str
    timestamp: datetime.datetime = datetime.datetime.now()


class State(pc.State):
    """The app state."""
    show_columns = ["Question", "Answer"]

    prompt: str = ""
    result: str = ""

    @pc.var
    def questions(self) -> list[Question]:
        """Get the saved questions and answers from the database."""
        with pc.session() as session:
            qa = (
                session.query(Question)
                # .distict(Question.prompt)
                # .order_by(Question.timestamp.desc())
                .limit(MAX_QUESTIONS)
                .all()
            )
            return [[q.prompt, q.answer] for q in qa]


    def get_result(self):
        if (
            pc.session()
            .query(Question)
            .where(Question.prompt == self.prompt)
            .first()
            or pc.session()
            .query(Question)
            .where(
                Question.timestamp
                > datetime.datetime.now() - datetime.timedelta(days=1)
            )
            .count()
            > MAX_QUESTIONS
        ):
            return pc.window_alert(
                "You have already asked this question or have asked too many questions in the past 24 hours."
            )
        try:
            self.result = ask_chatgpt(self.prompt)
        except:
            return pc.window_alert("Error occured with OpenAI execution.")


    def save_result(self):
        with pc.session() as session:
            qa = Question(prompt=self.prompt, answer=self.result)
            session.add(qa)
            session.commit()

def index():
    return pc.center(
        pc.vstack(
            pc.center(
                pc.vstack(
                    pc.heading("질문하기", font_size="1.5em"),
                    pc.input(
                        on_blur=State.set_prompt, placeholder="Question", width="100%"
                    ),
                    pc.button("Get Answer", on_click=State.get_result, width="100%"),
                    pc.text_area(
                        default_value=State.result,
                        placeholder="GPT Result",
                        width="100%",
                    ),
                    pc.button("Save Answer", on_click=State.save_result, width="100%"),
                    shadow="lg",
                    padding="1em",
                    border_radius="lg",
                    width="100%",
                ),
                width="100%",
            ),
            pc.center(
                pc.vstack(
                    pc.heading("Saved Q&A", font_size="1.5em"),
                    pc.divider(),
                    pc.data_table(
                        data=State.questions,
                        columns=State.show_columns,
                        pagination=True,
                        search=True,
                        sort=True,
                        width="100%",
                    ),
                    shadow="lg",
                    padding="1em",
                    border_radius="lg",
                    width="100%",
                ),
                width="100%",
            ),
            width="50%",
            spacing="2em",
        ),
        padding_top="6em",
        text_align="top",
        position="relative",
    )


# Add state and page to the app.
app = pc.App(state=State)
app.add_page(index)
app.compile()

