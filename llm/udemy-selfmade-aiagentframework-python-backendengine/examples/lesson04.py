# ============================================================
# AI-1 실제 OpenAI 연동 통합 실습
# Config, Session, Provider, Tool, Agentic Loop,
# Usage, Checkpoint, Summarization, Tool Security
# ============================================================
from __future__ import annotations
import json
import os
import uuid
from dataclasses import dataclass, field
from pathlib import Path
from typing import Any, Optional, Protocol
from dotenv import load_dotenv
from openai import OpenAI

# ============================================================
# 0. 환경 설정 읽기
# ============================================================

PROJECT_ROOT = Path(__file__).resolve().parents[1]
load_dotenv(PROJECT_ROOT / ".env")
# ============================================================
# 1. Config
# ============================================================

@dataclass
class Config:
    default_model_id: str
    memory_dir: str
    resume_session_id: Optional[str] = None
    checkpoint_interval: int = 2
    context_token_limit: int = 1200
    summary_threshold_ratio: float = 0.7
    max_tool_iterations: int = 5

# ============================================================
# 2. Usage
# ============================================================

@dataclass
class LLMUsage:
    prompt_tokens: int = 0
    completion_tokens: int = 0
    total_tokens: int = 0


@dataclass
class UsageTracker:
    total_prompt_tokens: int = 0
    total_completion_tokens: int = 0
    total_tokens: int = 0
    last_prompt_tokens: int = 0

    def add(self, usage: LLMUsage) -> None:
        self.total_prompt_tokens += usage.prompt_tokens
        self.total_completion_tokens += usage.completion_tokens
        self.total_tokens += usage.total_tokens
        self.last_prompt_tokens = usage.prompt_tokens


# ============================================================
# 3. Session
# ============================================================

@dataclass
class Session:
    title: str
    session_id: str = field(default_factory=lambda: str(uuid.uuid4()))
    summary: str = ""
    messages: list[dict[str, Any]] = field(default_factory=list)
    usage: UsageTracker = field(default_factory=UsageTracker)
    user_turn_count: int = 0

    def add_user_message(self, content: str) -> None:
        self.user_turn_count += 1
        self.messages.append({"role": "user", "content": content})

    def add_assistant_message(
        self,
        content: str,
        tool_calls: Optional[list[dict[str, Any]]] = None,
    ) -> None:
        message: dict[str, Any] = {
            "role": "assistant",
            "content": content,
        }

        if tool_calls:
            message["tool_calls"] = tool_calls

        self.messages.append(message)

    def add_tool_message(self, tool_call_id: str, content: str) -> None:
        self.messages.append(
            {
                "role": "tool",
                "tool_call_id": tool_call_id,
                "content": content,
            }
        )

    def to_dict(self) -> dict[str, Any]:
        return {
            "session_id": self.session_id,
            "title": self.title,
            "summary": self.summary,
            "messages": self.messages,
            "usage": {
                "total_prompt_tokens": self.usage.total_prompt_tokens,
                "total_completion_tokens": self.usage.total_completion_tokens,
                "total_tokens": self.usage.total_tokens,
                "last_prompt_tokens": self.usage.last_prompt_tokens,
            },
            "user_turn_count": self.user_turn_count,
        }

    @staticmethod
    def from_dict(data: dict[str, Any]) -> "Session":
        usage_data = data.get("usage", {})

        session = Session(
            title=data["title"],
            session_id=data["session_id"],
            summary=data.get("summary", ""),
            messages=data.get("messages", []),
            user_turn_count=data.get("user_turn_count", 0),
        )

        session.usage = UsageTracker(
            total_prompt_tokens=usage_data.get("total_prompt_tokens", 0),
            total_completion_tokens=usage_data.get("total_completion_tokens", 0),
            total_tokens=usage_data.get("total_tokens", 0),
            last_prompt_tokens=usage_data.get("last_prompt_tokens", 0),
        )

        return session


class SessionManager:
    def __init__(self, memory_dir: str):
        self.memory_path = PROJECT_ROOT / memory_dir
        self.memory_path.mkdir(parents=True, exist_ok=True)

    def get_session_file(self, session_id: str) -> Path:
        return self.memory_path / f"{session_id}.json"

    def save(self, session: Session) -> None:
        session_file = self.get_session_file(session.session_id)

        with open(session_file, "w", encoding="utf-8") as file:
            json.dump(session.to_dict(), file, ensure_ascii=False, indent=2)

        print(f"[Checkpoint] 세션 저장 완료: {session_file}")

    def load(self, session_id: str) -> Session:
        session_file = self.get_session_file(session_id)

        if not session_file.exists():
            raise FileNotFoundError(f"세션 파일을 찾지 못했습니다: {session_file}")

        with open(session_file, "r", encoding="utf-8") as file:
            data = json.load(file)

        print(f"[Memory] 기존 세션 로드 완료: {session_file}")
        return Session.from_dict(data)

    def list_sessions(self) -> list[dict[str, str]]:
        result = []

        for file in sorted(self.memory_path.glob("*.json")):
            with open(file, "r", encoding="utf-8") as f:
                data = json.load(f)

            result.append(
                {
                    "session_id": data.get("session_id", file.stem),
                    "title": data.get("title", "제목 없는 세션"),
                }
            )

        return result


# ============================================================
# 4. Tool 추상화
# ============================================================

class Tool(Protocol):
    name: str
    description: str

    def schema(self) -> dict[str, Any]:
        ...

    def run(self, arguments: dict[str, Any]) -> dict[str, Any]:
        ...


class CheckScheduleTool:
    name = "check_schedule"
    description = "수강생 이름을 받아 다음 수업 일정을 확인합니다."

    def schema(self) -> dict[str, Any]:
        return {
            "type": "function",
            "function": {
                "name": self.name,
                "description": self.description,
                "parameters": {
                    "type": "object",
                    "properties": {
                        "student_name": {
                            "type": "string",
                            "description": "수업 일정을 확인할 수강생 이름입니다.",
                        }
                    },
                    "required": ["student_name"],
                    "additionalProperties": False,
                },
                "strict": True,
            },
        }

    def run(self, arguments: dict[str, Any]) -> dict[str, Any]:
        student_name = arguments["student_name"]

        schedule_data = {
            "민수": "화요일 오후 네 시",
            "서연": "목요일 오후 일곱 시",
            "지훈": "토요일 오전 열 시",
        }

        schedule = schedule_data.get(student_name)

        if schedule is None:
            return {
                "success": False,
                "message": f"{student_name}의 수업 일정을 찾지 못했습니다.",
            }

        return {
            "success": True,
            "student_name": student_name,
            "schedule": schedule,
            "message": f"{student_name}의 다음 수업은 {schedule}입니다.",
        }


class SaveCounselingNoteTool:
    name = "save_counseling_note"
    description = "수강생 이름과 상담 메모를 받아 상담 기록에 저장합니다."

    def __init__(self):
        self.note_path = PROJECT_ROOT / "data" / "counseling_notes"
        self.note_path.mkdir(parents=True, exist_ok=True)

    def schema(self) -> dict[str, Any]:
        return {
            "type": "function",
            "function": {
                "name": self.name,
                "description": self.description,
                "parameters": {
                    "type": "object",
                    "properties": {
                        "student_name": {
                            "type": "string",
                            "description": "상담 메모를 저장할 수강생 이름입니다.",
                        },
                        "note": {
                            "type": "string",
                            "description": "저장할 상담 메모 내용입니다.",
                        },
                    },
                    "required": ["student_name", "note"],
                    "additionalProperties": False,
                },
                "strict": True,
            },
        }

    def run(self, arguments: dict[str, Any]) -> dict[str, Any]:
        student_name = arguments["student_name"]
        note = arguments["note"]

        note_file = self.note_path / f"{student_name}.txt"

        with open(note_file, "a", encoding="utf-8") as file:
            file.write(note + "\n")

        return {
            "success": True,
            "student_name": student_name,
            "message": f"{student_name}의 상담 메모를 저장했습니다.",
            "file": str(note_file),
        }


# ============================================================
# 5. Tool Security
# ============================================================
class SafeToolRunner:
    def __init__(self, tools: list[Tool]):
        self.tool_dict = {tool.name: tool for tool in tools}

        self.allowed_tools = {
            "check_schedule",
            "save_counseling_note",
        }

    def schemas(self) -> list[dict[str, Any]]:
        return [tool.schema() for tool in self.tool_dict.values()]

    def run_tool(self, tool_name: str, arguments_json: str) -> dict[str, Any]:
        if tool_name not in self.allowed_tools:
            return {
                "success": False,
                "message": f"허용되지 않은 도구입니다: {tool_name}",
            }

        tool = self.tool_dict.get(tool_name)

        if tool is None:
            return {
                "success": False,
                "message": f"등록되지 않은 도구입니다: {tool_name}",
            }

        try:
            arguments = json.loads(arguments_json)
        except json.JSONDecodeError:
            return {
                "success": False,
                "message": "도구 입력값 JSON을 해석하지 못했습니다.",
            }

        if tool_name == "check_schedule":
            if not arguments.get("student_name"):
                return {
                    "success": False,
                    "message": "수강생 이름이 필요합니다.",
                }

        if tool_name == "save_counseling_note":
            if not arguments.get("student_name") or not arguments.get("note"):
                return {
                    "success": False,
                    "message": "수강생 이름과 상담 메모가 모두 필요합니다.",
                }

        return tool.run(arguments)


# ============================================================
# 6. OpenAI Provider
# ============================================================
class OpenAIProvider:
    def __init__(self):
        self.client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

    def send(
        self,
        model_id: str,
        messages: list[dict[str, Any]],
        tools: Optional[list[dict[str, Any]]] = None,
    ):
        kwargs: dict[str, Any] = {
            "model": model_id,
            "messages": messages,
            "temperature": 0.1,
        }

        if tools:
            kwargs["tools"] = tools

        return self.client.chat.completions.create(**kwargs)

    def summarize(self, model_id: str, text: str) -> tuple[str, LLMUsage]:
        messages = [
            {
                "role": "system",
                "content": (
                    "너는 상담 기록 요약 담당자다. "
                    "앞으로의 대화에 필요한 사실, 약속, 일정, 저장된 메모만 남겨라."
                ),
            },
            {
                "role": "user",
                "content": "다음 상담 기록을 핵심 기억으로 요약해 주세요.\n\n" + text,
            },
        ]

        response = self.client.chat.completions.create(
            model=model_id,
            messages=messages,
            temperature=0.1,
        )

        usage = usage_from_response(response)
        summary = response.choices[0].message.content or ""

        return summary, usage


def usage_from_response(response) -> LLMUsage:
    raw_usage = response.usage

    if raw_usage is None:
        return LLMUsage()

    return LLMUsage(
        prompt_tokens=raw_usage.prompt_tokens or 0,
        completion_tokens=raw_usage.completion_tokens or 0,
        total_tokens=raw_usage.total_tokens or 0,
    )


# ============================================================
# 7. Engine
# ============================================================

class AgentEngine:
    def __init__(self, config: Config):
        self.config = config
        self.provider = OpenAIProvider()
        self.session_manager = SessionManager(config.memory_dir)

        self.safe_tool_runner = SafeToolRunner(
            tools=[
                CheckScheduleTool(),
                SaveCounselingNoteTool(),
            ]
        )

        if config.resume_session_id:
            self.session = self.session_manager.load(config.resume_session_id)
        else:
            self.session = Session(title="민수 학습 상담")
            self.session_manager.save(self.session)

    def system_message(self) -> dict[str, str]:
        content = (
            "너는 학원 상담 도우미다. "
            "모르는 정보는 추측하지 말고 필요한 경우 제공된 도구를 사용한다. "
            "수업 일정은 반드시 check_schedule 도구로 확인한다. "
            "상담 메모 저장 요청은 save_counseling_note 도구를 사용한다. "
            "도구 결과를 바탕으로 짧고 친절하게 답한다."
        )

        if self.session.summary:
            content += "\n\n[이전 대화 핵심 요약]\n" + self.session.summary

        return {"role": "system", "content": content}

    def build_messages_for_model(self) -> list[dict[str, Any]]:
        return [self.system_message()] + self.session.messages

    def send_message(self, user_text: str) -> str:
        self.session.add_user_message(user_text)

        final_answer = self._send_with_tools()

        self.session.add_assistant_message(final_answer)

        self.checkpoint_if_needed()
        self.summarize_if_needed()

        return final_answer

    def _send_with_tools(self) -> str:
        for iteration in range(self.config.max_tool_iterations):
            response = self.provider.send(
                model_id=self.config.default_model_id,
                messages=self.build_messages_for_model(),
                tools=self.safe_tool_runner.schemas(),
            )

            self.session.usage.add(usage_from_response(response))

            assistant_message = response.choices[0].message
            tool_calls = assistant_message.tool_calls or []

            if not tool_calls:
                return assistant_message.content or ""

            tool_call_dicts = [tool_call.model_dump() for tool_call in tool_calls]

            self.session.add_assistant_message(
                content=assistant_message.content or "",
                tool_calls=tool_call_dicts,
            )

            for tool_call in tool_calls:
                tool_name = tool_call.function.name
                arguments_json = tool_call.function.arguments

                tool_result = self.safe_tool_runner.run_tool(
                    tool_name=tool_name,
                    arguments_json=arguments_json,
                )

                self.session.add_tool_message(
                    tool_call_id=tool_call.id,
                    content=json.dumps(tool_result, ensure_ascii=False),
                )

        return "도구 실행 반복 횟수가 너무 많아 중단했습니다."

    def checkpoint_if_needed(self) -> None:
        if self.session.user_turn_count % self.config.checkpoint_interval == 0:
            self.session_manager.save(self.session)

    def summarize_if_needed(self) -> None:
        threshold = int(
            self.config.context_token_limit * self.config.summary_threshold_ratio
        )

        last_prompt_tokens = self.session.usage.last_prompt_tokens

        print(
            f"[Usage] 마지막 입력 토큰: {last_prompt_tokens}, "
            f"요약 기준: {threshold}, "
            f"누적 전체 토큰: {self.session.usage.total_tokens}"
        )

        if last_prompt_tokens < threshold:
            return

        print("[Summarization] 입력 컨텍스트가 길어져 요약을 시작합니다.")

        conversation_text = self.session_to_plain_text()

        summary, usage = self.provider.summarize(
            model_id=self.config.default_model_id,
            text=conversation_text,
        )

        self.session.usage.add(usage)
        self.session.summary = summary

        self.session.messages = []

        self.session_manager.save(self.session)

        print("[Summarization] 요약 완료.")
        print(self.session.summary)

    def session_to_plain_text(self) -> str:
        lines = []

        for message in self.session.messages:
            role = message.get("role", "")

            if role == "tool":
                lines.append("[도구 결과] " + str(message.get("content", "")))
                continue

            if role == "assistant" and message.get("tool_calls"):
                lines.append("[도우미] 도구 호출 요청")
                continue

            lines.append(f"[{role}] {message.get('content', '')}")

        return "\n".join(lines)

    def print_status(self) -> None:
        print("\n========== 세션 상태 ==========")
        print("세션 제목:", self.session.title)
        print("세션 ID:", self.session.session_id)
        print("메시지 개수:", len(self.session.messages))
        print("이전 대화 요약 있음:", bool(self.session.summary))
        print("누적 입력 토큰:", self.session.usage.total_prompt_tokens)
        print("누적 출력 토큰:", self.session.usage.total_completion_tokens)
        print("누적 전체 토큰:", self.session.usage.total_tokens)
        print("==============================\n")


# ============================================================
# 8. 실행 예제
# ============================================================

def main():
    api_key = os.getenv("OPENAI_API_KEY")

    if not api_key:
        raise RuntimeError(
            "OPENAI_API_KEY가 비어 있습니다. "
            "프로젝트 루트의 .env 파일을 확인하세요."
        )

    model_id = os.getenv("OPENAI_MODEL", "gpt-5.4-mini")

    config = Config(
        default_model_id=model_id,
        memory_dir="data/memory",
        resume_session_id=None,
        checkpoint_interval=2,
        context_token_limit=1200,
        summary_threshold_ratio=0.7,
        max_tool_iterations=5,
    )

    engine = AgentEngine(config)

    questions = [
        "민수의 다음 수업 일정을 알려줘.",
        "그 내용을 상담 메모에 저장해 줘. 메모에는 다음 상담에서 오답 노트 제출 여부를 확인한다고 적어줘.",
        "지금까지 민수 상담에서 확인한 핵심 내용을 정리해 줘.",
    ]

    for question in questions:
        print("\n사용자:", question)
        answer = engine.send_message(question)
        print("AI-1:", answer)
        engine.print_status()

    print("저장된 세션 ID:", engine.session.session_id)
    print("다음 실행에서 이어가려면 Config의 resume_session_id에 이 값을 넣으면 됩니다.")

if __name__ == "__main__":
    main()