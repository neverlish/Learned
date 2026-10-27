from dataclasses import dataclass, field
from typing import Optional
from app01 import *

class MemoryEngine:
    def __init__(self, checkpoint_interval: int, context_window_size: int, summary_threshold_ratio: float):
        self.session = Session(title="민수 장기 학습 상담")
        self.checkpoint_interval = checkpoint_interval
        self.message_count_since_checkpoint = 0
        self.context_window_size = context_window_size
        self.summary_threshold_ratio = summary_threshold_ratio
        self.token_threshold = int(context_window_size * summary_threshold_ratio)

    def add_message(self, message: Message):
        self.session.add_message(message)
        self._checkpoint_if_needed()
        self._summarize_if_needed()

    def _checkpoint_if_needed(self):
        self.message_count_since_checkpoint += 1

        if self.message_count_since_checkpoint >= self.checkpoint_interval:
            print("체크포인트 저장:", len(self.session.messages), "개의 메시지를 저장했습니다.")
            self.message_count_since_checkpoint = 0

    def _summarize_if_needed(self):
        total_tokens = self.session.usage.input_tokens # + self.session.usage.output_tokens
        print("현재 토큰:", total_tokens, "/ 요약 기준:", self.token_threshold)

        if total_tokens >= self.token_threshold:
            print("요약 필요: 민수 상담 기록을 핵심 노트로 압축해야 합니다.")
        else:
            print("요약 전: 아직 원본 대화를 유지해도 됩니다.")

if __name__ == "__main__":
    memory_engine = MemoryEngine(
        checkpoint_interval=3,
        context_window_size=100,
        summary_threshold_ratio=0.8,
    )

    memory_engine.add_message(
        Message(role="사용자", content="민수의 최근 학습 태도를 알려줘.")
    )
    memory_engine.add_message(
        Message(
            role="도우미",
            content="민수는 최근 과제 제출 습관이 좋아지고 있습니다.",
            usage=Usage(input_tokens=24, output_tokens=18),
        )
    )

    memory_engine.add_message(
        Message(role="사용자", content="다음 상담에서 확인할 약속도 정리해 줘.")
    )

    memory_engine.add_message(
        Message(
            role="도우미",
            content="다음 상담에서는 오답 노트 제출 여부를 확인하면 좋겠습니다.",
            usage=Usage(input_tokens=30, output_tokens=22),
        )
    )

    print()