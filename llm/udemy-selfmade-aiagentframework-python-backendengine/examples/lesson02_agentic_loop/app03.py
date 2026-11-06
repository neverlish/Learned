# -send() 가 ToolCall 을 처리하고 최종 답변을 만드는 흐름
from dataclasses import dataclass, field
import json
from typing import Optional # | None

@dataclass
class ToolCall:
    name: str
    arguments: str # {"student_name":"민수"}

@dataclass
class LoopMessage:
    role: str
    content: str

@dataclass
class AssistantMessage:
    content: str
    tool_call: Optional[ToolCall] = None

@dataclass
class LoopSession:
    messages: list[LoopMessage] = field(default_factory=list)

    def add_message(self, message: LoopMessage):
        self.messages.append(message)

class ScheduleTool:
    def run(self, student_name):
        schedule_data = {
            "민수": "화요일 오후 네 시",
            "서연": "목요일 오후 일곱 시",
            "지훈": "토요일 오전 열 시",
        }

        schedule = schedule_data.get(student_name)

        if schedule is None:
            return student_name + "의 수업 일정을 찾지 못했습니다."

        return student_name + "의 다음 수업은 " + schedule + "입니다."


class FakeLLMProvider:
    def send(self, messages, tool_dict, model_id):
        last_message = messages[-1]

        if last_message.role == "도구":
            return AssistantMessage(
                content="확인했습니다. " + last_message.content,
                tool_call=None,
            )

        return AssistantMessage(
            content="",
            tool_call=ToolCall(
                name="check_schedule",
                arguments='{"student_name": "민수"}',
            ),
        )

class MiniLoopEngine:
    def __init__(self):
        self.session = LoopSession()
        self.default_model_id = "상담_기본_모델"
        self.llm_provider = FakeLLMProvider()

        self.tool_dict = {
            "check_schedule": ScheduleTool()
        }

    def _send(self, model_id):
        response = self.llm_provider.send(
            self.session.messages,
            self.tool_dict,
            model_id,
        )

        if response.tool_call is not None:
            tool_name = response.tool_call.name
            tool = self.tool_dict.get(tool_name)

            if tool is None:
                return "요청한 도구를 찾지 못했습니다."

            kwargs = json.loads(response.tool_call.arguments)

            tool_result = tool.run(**kwargs) # student_name= "민수"

            tool_message = LoopMessage(
                role="도구",
                content=tool_result,
            )
            self.session.add_message(tool_message)

            return self._send(model_id)

        return response.content


    def send_message(self, user_text):
        user_message = LoopMessage(
            role="사용자",
            content=user_text,
        )

        self.session.add_message(user_message)
        final_response = self._send(self.default_model_id)


        self.session.add_message(
            LoopMessage(role="도우미", content=final_response)
        )

        return final_response

loop_engine = MiniLoopEngine()

answer = loop_engine.send_message("민수의 다음 수업 일정을 알려줘.")

print("최종 응답:", answer)

