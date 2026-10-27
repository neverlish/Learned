# Provider 와 Tool 추상
from abc import ABC, abstractmethod
from dataclasses import dataclass
from typing import NamedTuple, Optional
import json

@dataclass
class Message:
    role: str
    content: str

# LLM -> Agent

# 모델이 만든 응답 메시지
@dataclass
class AssistantMessage:
    content: str
    model_name: str

# 모델 당장 창구가 따라야할 표준 공통 규격
class LLMProvider(ABC):
    @abstractmethod
    def send(self, messages: list[Message], model_id: str) -> AssistantMessage:
        pass

    # 지원되는 모델 이름 목록
    @property
    @abstractmethod
    def models(self) -> list[str]:
        pass

class CounselingProvider(LLMProvider):
    def send(self, messages: list[Message], model_id: str) -> AssistantMessage:
        last_message = messages[-1]
        answer = "상담 요청을 확인했습니다. '" + last_message.content + "' 내용을 바탕으로 안내하겠습니다."

        return AssistantMessage(content=answer, model_name=model_id)

    @property
    def models(self) -> list[str]:
        return ["상담_기본_모델","상담_기본_모델2"]

class SummaryProvider(LLMProvider):
    def send(self, messages: list[Message], model_id: str) -> AssistantMessage:
        text = " ".join(message.content for message in messages)
        answer = "요약했습니다. 핵심 내용은 '" + text[:20] + "...' 입니다."
        return AssistantMessage(content=answer, model_name=model_id)

    @property
    def models(self) -> list[str]:
        return ["요약_전용_모델","요약_전용_모델2"]


if __name__ == "__main__":

    providers = [CounselingProvider(), SummaryProvider()]

    model_provider_map = {
        model_id: provider
        for provider in providers
        for model_id in provider.models
    }

    print("64:", model_provider_map)

    messages = [
        Message(role="사용자", content="민수의 최근 학습 태도를 상담 기록 기준으로 설명해 줘.")
    ]

    selected_model_id = "상담_기본_모델"

    provider = model_provider_map[selected_model_id]

    response = provider.send(messages,selected_model_id )

    print("응답 모델:", response.model_name)
    print("응답 내용:", response.content)

