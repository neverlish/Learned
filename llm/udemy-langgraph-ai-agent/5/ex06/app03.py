import json
from langchain_openai import ChatOpenAI
from langchain_core.messages import SystemMessage, HumanMessage
llm = ChatOpenAI(model="gpt-5.4-mini", temperature=0)
failure_logs = [
    {
        "user_request": "A12345 주문이 지금 어디쯤 배송 중인지 알려줘.",
        "expected_tool": "track_delivery",
        "selected_tool": "cancel_order",
        "is_success": False,
        "reason": "주문 번호가 포함되어 있어 주문 관련 요청으로 판단했습니다.",
    },
    {
        "user_request": "택배가 멈춘 것 같은데 확인해줘.",
        "expected_tool": "track_delivery",
        "selected_tool": "unknown",
        "is_success": False,
        "reason": "명확한 주문 번호가 없어 처리할 수 없다고 판단했습니다.",
    },
    {
        "user_request": "깨진 컵이 왔어요. 환불 가능한가요?",
        "expected_tool": "issue_refund",
        "selected_tool": "track_delivery",
        "is_success": False,
        "reason": "상품 도착 문제로 보고 배송 상태 확인을 먼저 선택했습니다.",
    },
    {
        "user_request": "배송 전에 주문 취소하고 싶어요.",
        "expected_tool": "cancel_order",
        "selected_tool": "track_delivery",
        "is_success": False,
        "reason": "배송이라는 단어에 집중해 배송 조회로 판단했습니다.",
    },
]

system_prompt = """
당신은 AI Agent 개선 Backlog를 작성하는 운영 담당자입니다.
여러 실패 로그를 보고 반복되는 문제를 찾아 개선 작업 목록을 만드세요.

반드시 JSON 배열 형식으로만 답하세요.
각 항목은 다음 키를 가져야 합니다.

- issue_title: 문제 제목
- repeated_pattern: 반복되는 실패 패턴
- likely_root_cause: 가능성 높은 근본 원인
- improvement_candidate: 개선 후보
- test_cases_to_add: 추가할 테스트 문장 목록
- priority: high, medium, low 중 하나

주의:
보안 공격 방어 내용으로 확장하지 마세요.
사람과 Agent의 협업 구조 설명으로 확장하지 마세요.
오직 Agent 개선 작업 목록만 작성하세요.
"""
failure_logs_text = json.dumps(failure_logs, ensure_ascii=False, indent=2)

user_prompt = f"""
다음 실패 로그 목록을 분석해서 개선 Backlog를 작성하세요.

실패 로그 목록:
{failure_logs_text}
"""

messages = [
    SystemMessage(content=system_prompt),
    HumanMessage(content=user_prompt),
]

response = llm.invoke(messages)

backlog_text = response.content

print(backlog_text)

