from dataclasses import dataclass, field
from typing import Optional
from types import MappingProxyType

@dataclass
class Config:
    default_model_id: str   # 기본 사용 모델
    tools_dir: str          # 도구가 들어 있는 디렉토리 경로
    mcp_tools_dir: str      # MCP 도구가 들어 있는 폴더 경로
    memory_dir: str         # 대화기록, 세션 정보 기록 디렉토리
    session_id: str | None = None   # 세션아이디 uuid + title
    checkpoint_interval: int = 3 # 몇번마다 중간 저장할까?
    summary_threshold_ratio: float = 0.8 # 대화가 길어졌을때 요약을 시작할 비율 10k
    # 도구별 세부설정
    tool_config: dict = field(default_factory=lambda: MappingProxyType({}))
    # 모델별 환경 세부설정
    provider_config: dict = field(default_factory=lambda: MappingProxyType({}))


config = Config(
    default_model_id="상담_기본_모델",
    tools_dir="업무도구모음",
    mcp_tools_dir="표준도구모음",
    memory_dir="상담기록",
    session_id=None,
    checkpoint_interval=3,
    summary_threshold_ratio=0.8,
)
print(config)

##########################################################
# 엔진 생성
##########################################################
class MiniEngine:
    def __init__(self, config: Config):
        self.default_model_id = config.default_model_id
        context_window_size = 1000  # 컨텍스트 맥스 토큰수, 0.8
        self.token_threshold = int(context_window_size * config.summary_threshold_ratio)
        self.llm_providers = ["상담모델제공자", "요약모델제공자"]
        self.model_provider_map = {
            "상담_기본_모델": "상담모델제공자",
            "요약_전용_모델": "요약모델제공자",
        }
        self.tool_dict = {
            "상담기록조회": "수강생의 이전 상담 기록을 찾아보는 도구",
            "수업일정확인": "수강생의 다음 수업 일정을 확인하는 도구",
        }
        self.memory_dir = config.memory_dir
        self.session_id = config.session_id

        self.checkpoint_interval = config.checkpoint_interval
        self.ready = True

    def describe(self):
        print("기본 모델:", self.default_model_id)
        print("요약 기준 토큰:", self.token_threshold)
        print("모델 제공자:", self.llm_providers)
        print("도구 목록:", list(self.tool_dict.keys()))
        print("기억 저장 위치:", self.memory_dir)
        print("준비 완료:", self.ready)

engine = MiniEngine(config)
engine.describe()

@dataclass
class Message:
    role: str   # 누가?
    content: str # 무엇~

import uuid

@dataclass
class Session:
    title: str
    session_id: str = field(default_factory=lambda: str(uuid.uuid4()))
    messages: list[Message] = field(default_factory=list)

    def add_message(self, message: Message):
        self.messages.append(message)

    def show(self):
        print("세션 제목:", self.title)
        print("세션 ID:", self.session_id)

        for message in self.messages:
            print(message.role + ":", message.content)

session = Session(title="민수 학습 상담")
session.add_message(
    Message(role="사용자", content="민수의 다음 수업 일정을 알려줘.")
)

session.add_message(
    Message(role="도우미", content="민수의 다음 수업은 화요일 오후 네 시입니다.")
)

session.add_message(
    Message(role="사용자", content="그 내용을 상담 메모에도 남겨줘.")
)

session.show()


