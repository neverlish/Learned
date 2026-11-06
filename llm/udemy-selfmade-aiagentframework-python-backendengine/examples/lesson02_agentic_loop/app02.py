##############################
# run() 입력, _send() 호출
##############################
from dataclasses import dataclass, field

@dataclass
class RunMessage:
    role: str
    content: str

@dataclass
class RunSession:
    messages: list[RunMessage] = field(default_factory=list)

    def add_message(self, message: RunMessage):
        self.messages.append(message)

class MiniRunEngine:
    def __init__(self):
        self.session = RunSession()

    def _send(self):
        last_message = self.session.messages[-1]
        return "요청을 접수했습니다. 확인할 내용은 '" + last_message.content + "' 입니다."

    def run(self, get_input_func, on_response_func):

        while True:
            user_input = get_input_func()

            if not user_input:
                break

            user_message = RunMessage(
                role="사용자",
                content=user_input
            )
            self.session.add_message(user_message)
            response = self._send()

            assistant_message = RunMessage(
                role="도우미",
                content=response
            )

            self.session.add_message(assistant_message)
            on_response_func(response)


sample_inputs = [
    "민수의 다음 수업 일정을 알려줘.",
    "서연이의 최근 상담 내용을 요약해 줘.",
    "",
]

def get_input():
    return sample_inputs.pop(0) if sample_inputs else ""

def on_response(response):
    print("최종 응답:", response)

run_engine = MiniRunEngine()

run_engine.run(get_input, on_response)
