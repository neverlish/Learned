from dataclasses import dataclass, field
from typing import Optional
from app02 import *

@dataclass
class ToolRequest:
    tool_name: str
    arguments: dict

class SafeToolRunner:
    def __init__(self):
        self.allowed_tools = {
            "check_schedule",
            "save_counseling_note",
        }

    def validate_request(self, request: ToolRequest):

        if request.tool_name not in self.allowed_tools:
            return False, "허용되지 않은 도구입니다."

        if request.tool_name == "check_schedule":
            student_name = request.arguments.get("student_name")

            if not student_name:
                return False, "수강생 이름이 필요합니다."

        if request.tool_name == "save_counseling_note":
            student_name = request.arguments.get("student_name")
            note = request.arguments.get("note")

            if not student_name or not note:
                return False, "수강생 이름과 상담 메모가 모두 필요합니다."

        return True, "검증을 통과했습니다."

    def run_tool(self, request: ToolRequest):
        is_valid, message = self.validate_request(request)

        if not is_valid:
            return "도구 실행 거부: " + message

        if request.tool_name == "check_schedule":
            return request.arguments["student_name"] + "의 다음 수업은 화요일 오후 네 시입니다."

        if request.tool_name == "save_counseling_note":
            return request.arguments["student_name"] + "의 상담 메모를 저장했습니다."

        return "도구 실행이 완료되었습니다."


if __name__ == "__main__":
    runner = SafeToolRunner()
    safe_request = ToolRequest(
        tool_name="check_schedule",
        arguments={"student_name": "민수"},
    )

    note_request = ToolRequest(
        tool_name="save_counseling_note",
        arguments={
            "student_name": "민수",
            "note": "다음 상담에서 오답 노트 제출 여부를 확인합니다.",
        },
    )

    unsafe_request = ToolRequest(
        tool_name="delete_all_notes",
        arguments={"target": "전체"},
    )

    print(runner.run_tool(safe_request))
    print(runner.run_tool(note_request))
    print(runner.run_tool(unsafe_request))


