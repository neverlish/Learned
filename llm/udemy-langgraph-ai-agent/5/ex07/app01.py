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
        "is_success": False,
        "reason": "주문 번호가 있어서 주문 취소 관련 요청으로 판단했습니다.",
    },
    {
        "log_id": "L002",
        "user_request": "깨진 컵이 왔어요. 환불 가능한가요?",
        "expected_tool": "issue_refund",
        "selected_tool": "track_delivery",
        "is_success": False,
        "reason": "상품 도착 문제로 보고 배송 상태 확인을 먼저 선택했습니다.",
    },
    {
        "log_id": "L003",
        "user_request": "배송 전에 주문 취소하고 싶어요.",
        "expected_tool": "cancel_order",
        "selected_tool": "track_delivery",
        "is_success": False,
        "reason": "배송이라는 단어에 집중해 배송 조회로 판단했습니다.",
    },
]

system_prompt = """
당신은 AI Agent 실패 로그를 분류하는 운영 분석가입니다.
각 실패 로그를 보고 failure_type을 하나 선택하세요.

가능한 failure_type:
- wrong_tool: 도구를 잘못 선택함
- wrong_parameter: 도구 입력값을 잘못 생성함
- unclear_response: 사용자에게 준 응답이 불명확함
- missing_validation: 실행 전 검증이 부족함
- unknown_intent: 사용자 의도를 파악하지 못함

반드시 JSON 배열로만 답하세요.
각 항목은 다음 키를 가져야 합니다.
- log_id
- failure_type
- short_reason
"""

failure_logs_text = json.dumps(failure_logs, ensure_ascii=False, indent=2)

user_prompt = f"""
다음 실패 로그를 분류하세요.

실패 로그:
{failure_logs_text}
"""

messages = [
    SystemMessage(content=system_prompt),
    HumanMessage(content=user_prompt),
]

response = llm.invoke(messages)

classification_text = response.content

print(classification_text)

