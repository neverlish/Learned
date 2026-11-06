from abc import ABC, abstractmethod
from dataclasses import dataclass
from typing import NamedTuple, Optional
import json
from app01 import *


class Parameter(NamedTuple):
    name: str
    type: str
    description: str

@dataclass
class Tool(ABC):
    name: str
    description: str
    parameters: list[Parameter]
    required: set[str]

    @abstractmethod
    def run(self, **kwargs):    # 키워드 아규먼트 :
        pass

class ScheduleTool(Tool):
    def __init__(self):
        super().__init__(
            name="check_schedule",
            description="수강생 이름을 받아 다음 수업 일정을 알려주는 도구입니다.",
            parameters=[
                Parameter(
                    name="student_name",
                    type="string",
                    description="수업 일정을 확인할 수강생 이름입니다.",
                )
            ],
            required={"student_name"},
        )

    def run(self, **kwargs):
        student_name = kwargs["student_name"]
        # DB 검색.......
        return student_name + "의 다음 수업은 화요일 오후 네 시입니다."


if __name__ == "__main__":
    tool = ScheduleTool()

    print("도구 이름:", tool.name)
    print("도구 설명:", tool.description)
    print("필요한 입력값:", tool.parameters)
    print("도구 결과:", tool.run(student_name="민수"))