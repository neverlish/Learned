import json
from langchain_openai import ChatOpenAI
from langchain_core.messages import SystemMessage, HumanMessage

llm = ChatOpenAI(model="gpt-5.4-mini", temperature=0)

failure_log = {
    "user_request": "A12345 주문이 지금 어디쯤 배송 중인지 알려줘.",
    "expected_tool": "track_delivery",
    "selected_tool": "cancel_order",
    "is_success": False,
    "reason": "주문 번호가 포함되어 있어 주문 관련 요청으로 판단했습니다.",
}

system_prompt = """
당신은 AI Agent 운영 개선 담당자입니다.
주어진 실패 로그를 보고 다음 항목을 JSON으로만 작성하세요.

1. failure_type: 실패 유형
2. root_cause: 근본 원인
3. improvement_candidate: 개선 후보
4. test_case_to_add: 앞으로 추가할 테스트 문장
5. priority: high, medium, low 중 하나

가능한 failure_type 예:
- wrong_tool
- wrong_parameter
- unclear_response
- missing_validation
- unknown_intent
"""
failure_log_text = json.dumps(failure_log, ensure_ascii=False, indent=2)


user_prompt = f"""
다음 실패 로그를 분석하세요.

실패 로그:
{failure_log_text}
"""

messages = [
    SystemMessage(content=system_prompt),
    HumanMessage(content=user_prompt),
]

response = llm.invoke(messages)

analysis_text = response.content

print(analysis_text)
