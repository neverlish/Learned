from dataclasses import dataclass, field
@dataclass
class Message:
    role: str
    content: str

@dataclass
class Session:
    messages : list[Message] = field(default_factory=list) # []
    def add_message(self, message: Message):
        self.messages.append(message)

    def show(self):
        for message in self.messages:
            print(message.role + ":", message.content)

session = Session()
user_message = Message(
    role="사용자",
    content="민수의 다음 수업 일정을 알려줘."
)

session.add_message(user_message)

assistant_message = Message(
    role="도우미",
    content="민수의 다음 수업은 화요일 오후 네 시입니다."
)
session.add_message(assistant_message)

follow_up_message = Message(
    role="사용자",
    content="그 내용을 상담 메모에도 남겨줘."
)
session.add_message(follow_up_message)

session.show()
print()
