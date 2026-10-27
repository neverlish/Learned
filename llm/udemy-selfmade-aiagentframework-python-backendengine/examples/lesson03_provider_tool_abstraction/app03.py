from abc import ABC, abstractmethod
from dataclasses import dataclass
from typing import NamedTuple, Optional
import json

from app01 import *     # LLM
from app02 import *     # Tools

@dataclass
class ToolCall:
    name: str
    arguments: str


@dataclass
class LoopAssistantMessage:
    content: str    # 최종 응답

    tool_call: Optional[ToolCall] = None


class FakeProvider: # LLM
    def send(self, messages, model_id):
        last_message = messages[-1]

        # 2
        if last_message.role == "도구":
            return LoopAssistantMessage(
                content="확인했습니다. " + last_message.content,
                tool_call=None,
            )

        # 1
        return LoopAssistantMessage(
            content="",
            tool_call=ToolCall(
                name="check_schedule",
                arguments='{"student_name": "민수"}',
            ),
        )


class MiniEngine:
    def __init__(self):
        self.messages = []
        self.default_model_id = "상담_기본_모델"

        self.model_provider_map = {
            "상담_기본_모델": FakeProvider()
        }

        schedule_tool = ScheduleTool()

        self.tool_dict = {
            schedule_tool.name: schedule_tool
        }

    def send_message(self, user_text):

        self.messages.append(Message(role="사용자", content=user_text))

        provider = self.model_provider_map[self.default_model_id]

        response = provider.send(self.messages, self.default_model_id)

        if response.tool_call is not None:
            tool_name = response.tool_call.name
            tool = self.tool_dict.get(tool_name)

            if tool is None:
                return "요청한 도구를 찾지 못했습니다."

            kwargs = json.loads(response.tool_call.arguments) # json -> dic
            tool_result = tool.run(**kwargs)

            self.messages.append(Message(role="도구", content=tool_result))

            final_response = provider.send(self.messages, self.default_model_id)

            return final_response.content

        return response.content


if __name__ == "__main__":
    engine = MiniEngine()
    answer = engine.send_message("민수의 다음 수업 일정을 알려줘.")
    print("최종 답변:", answer)