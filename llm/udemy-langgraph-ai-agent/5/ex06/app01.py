import json
from langchain_openai import ChatOpenAI
from langchain_core.messages import SystemMessage, HumanMessage

llm = ChatOpenAI(model="gpt-5.4-mini", temperature=0)

available_tools = ["cancel_order", "track_delivery", "issue_refund"]

user_request = "A12345 주문이 지금 어디쯤 배송 중인지 알려줘."

expected_tool = "track_delivery"

system_prompt = f"""
당신은 고객 지원 Agent입니다.
사용자 요청을 읽고 아래 도구 중 가장 적절한 도구 하나만 선택하세요.

사용 가능한 도구:
{available_tools}

반드시 JSON 형식으로만 답하세요.
예:
{{"selected_tool": "track_delivery", "reason": "배송 상태 조회 요청이기 때문입니다."}}
"""
messages = [
    SystemMessage(content=system_prompt),
    HumanMessage(content=user_request),
]

response = llm.invoke(messages)

response_text = response.content
result = json.loads(response_text)

selected_tool = result["selected_tool"]

is_success = selected_tool == expected_tool

failure_log = {
    "user_request": user_request,
    "expected_tool": expected_tool,
    "selected_tool": selected_tool,
    "is_success": is_success,
    "reason": result["reason"],
}

print(json.dumps(failure_log, ensure_ascii=False, indent=2))





