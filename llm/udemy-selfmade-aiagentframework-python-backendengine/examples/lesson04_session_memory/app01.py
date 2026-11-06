from dataclasses import dataclass, field
from typing import Optional

@dataclass
class Usage:
    input_tokens: int = 0
    output_tokens: int = 0

@dataclass
class Message:
    role: str
    content: str
    usage: Optional[Usage] = None

@dataclass
class Session:
    title: str
    messages: list[Message] = field(default_factory=list)
    usage: Usage = field(default_factory=Usage)

    def add_message(self, message: Message):
        self.messages.append(message)

        if message.usage is not None:
            self.usage.input_tokens += message.usage.input_tokens
            self.usage.output_tokens += message.usage.output_tokens

    def show_status(self):
        print("세션 제목:", self.title)
        print("메시지 개수:", len(self.messages))
        print("입력 토큰:", self.usage.input_tokens)
        print("출력 토큰:", self.usage.output_tokens)

if __name__ == "__main__":
    session = Session(title="민수 학습 상담")

    session.add_message(
        Message(role="사용자", content="민수의 최근 학습 태도를 알려줘.")
    )

    session.add_message(
        Message(
            role="도우미",
            content="민수는 최근 과제 제출 습관이 좋아지고 있습니다.",
            usage=Usage(input_tokens=24, output_tokens=18),
        )
    )

    session.add_message(
        Message(role="사용자", content="다음 상담에서 확인할 약속도 정리해 줘.")
    )

    session.add_message(
        Message(
            role="도우미",
            content="다음 상담에서는 오답 노트 제출 여부를 확인하면 좋겠습니다.",
            usage=Usage(input_tokens=30, output_tokens=22),
        )
    )

    session.show_status()