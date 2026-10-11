import json
from langchain_openai import ChatOpenAI
from langchain_core.messages import SystemMessage, HumanMessage
llm = ChatOpenAI(model="gpt-5.4-mini", temperature=0)

failure_logs = [
    {
        "log_id": "L001",
        "user_request": "A12345 주문이 지금 어디쯤 배송 중인지 알려줘.",
        "expected_tool": "track_delivery",
        "selected_tool": "cancel_order",
        "failure_type": "wrong_tool",
        "user_impact": "medium",
    },
    {
        "log_id": "L002",
        "user_request": "내 택배 어디 있어?",
        "expected_tool": "track_delivery",
        "selected_tool": "unknown",
        "failure_type": "unknown_intent",
        "user_impact": "medium",
    },
    {
        "log_id": "L003",
        "user_request": "주문한 컵 언제 와?",
        "expected_tool": "track_delivery",
        "selected_tool": "issue_refund",
        "failure_type": "wrong_tool",
        "user_impact": "medium",
    },
    {
        "log_id": "L004",
        "user_request": "깨진 컵이 왔어요. 환불 가능한가요?",
        "expected_tool": "issue_refund",
        "selected_tool": "track_delivery",
        "failure_type": "wrong_tool",
        "user_impact": "high",
    },
    {
        "log_id": "L005",
        "user_request": "A77777 환불해줘.",
        "expected_tool": "issue_refund",
        "selected_tool": "issue_refund",
        "failure_type": "wrong_parameter",
        "user_impact": "high",
        "parameter_issue": "refund_reason 값이 비어 있음",
    },
]

system_prompt = """
당신은 AI Agent 실패 로그를 분석하는 RCA 담당자입니다.
여러 실패 로그를 보고 비슷한 문제끼리 묶은 뒤,
각 그룹마다 근본 원인과 개선 방향을 작성하세요.

반드시 JSON 배열로만 답하세요.
각 항목은 다음 키를 가져야 합니다.
- group_title: 실패 그룹 제목
- related_log_ids: 관련 로그 ID 목록
- repeated_pattern: 반복 패턴
- likely_root_cause: 가능성 높은 근본 원인
- improvement_candidate: 개선 후보
- test_cases_to_add: 추가할 테스트 문장 목록

주의:
보안 공격 방어 내용으로 확장하지 마세요.
사람과 Agent의 협업 구조 설명으로 확장하지 마세요.
오직 실패 분석과 개선 후보 작성에 집중하세요.
"""

failure_logs_text = json.dumps(failure_logs, ensure_ascii=False, indent=2)

user_prompt = f"""
다음 실패 로그를 분석해서 RCA 리포트를 작성하세요.

실패 로그:
{failure_logs_text}
"""

messages = [
    SystemMessage(content=system_prompt),
    HumanMessage(content=user_prompt),
]

response = llm.invoke(messages)

rca_report_text = response.content

print(rca_report_text)