import json
from langchain_openai import ChatOpenAI
from langchain_core.messages import SystemMessage, HumanMessage
llm = ChatOpenAI(model="gpt-5.4-mini", temperature=0)

available_tools = ["cancel_order", "track_delivery", "issue_refund"]

production_prompt = f"""
당신은 고객 지원 Agent입니다.
사용자 요청을 읽고 아래 도구 중 하나를 선택하세요.

사용 가능한 도구:
{available_tools}

반드시 JSON 형식으로만 답하세요.
{{"selected_tool": "도구이름", "reason": "선택 이유"}}
"""

shadow_prompt = f"""
당신은 고객 지원 Agent입니다.
사용자 요청을 읽고 아래 도구 중 하나를 선택하세요.

사용 가능한 도구:
{available_tools}

판단 기준:
- 취소, 취소하고 싶다, 배송 전 취소는 cancel_order입니다.
- 배송 위치, 택배 위치, 언제 도착은 track_delivery입니다.
- 깨짐, 파손, 환불, 교환은 issue_refund입니다.
- 배송과 취소가 함께 나오면 문장의 최종 의도가 취소인지 조회인지 구분하세요.

반드시 JSON 형식으로만 답하세요.
{{"selected_tool": "도구이름", "reason": "선택 이유"}}
"""

live_requests = [
    {"user_request": "A12345 주문이 지금 어디쯤 배송 중인지 알려줘.", "expected_tool": "track_delivery"},
    {"user_request": "배송 전에 주문 취소하고 싶어요.", "expected_tool": "cancel_order"},
    {"user_request": "깨진 컵이 왔어요. 환불 가능한가요?", "expected_tool": "issue_refund"},
    {"user_request": "택배가 멈춘 것 같은데 확인해줘.", "expected_tool": "track_delivery"},
    {"user_request": "아직 출고 전이면 주문 취소해줘.", "expected_tool": "cancel_order"},
    {"user_request": "상품이 파손돼서 환불 받고 싶어요.", "expected_tool": "issue_refund"},
    {"user_request": "내 물건이 아직 안 왔어.", "expected_tool": "track_delivery"},
    {"user_request": "배송 늦으면 취소하고 싶은데 지금 어디야?", "expected_tool": "track_delivery"},
    {"user_request": "A77777 환불해줘.", "expected_tool": "issue_refund"},
    {"user_request": "주문 취소 말고 배송 상태만 알려줘.", "expected_tool": "track_delivery"},
]

def safe_parse_json(response_text: str) -> dict:
    try:
        return json.loads(response_text)
    except json.JSONDecodeError:
        return {
            "selected_tool": "unknown",
            "reason": "JSON 파싱 실패"
        }

def run_agent(system_prompt: str, user_request: str) -> dict:
    messages = [
        SystemMessage(content=system_prompt),
        HumanMessage(content=user_request),
    ]
    response = llm.invoke(messages)
    result = safe_parse_json(response.content)
    result.setdefault("selected_tool", "unknown")
    result.setdefault("reason", "이유가 제공되지 않았습니다.")
    return result


shadow_records = []

regression_count = 0
improvement_count = 0

for item in live_requests:
    user_request = item["user_request"]
    expected_tool = item["expected_tool"]

    production_result = run_agent(production_prompt, user_request)

    shadow_result = run_agent(shadow_prompt, user_request)

    production_success = production_result["selected_tool"] == expected_tool
    shadow_success = shadow_result["selected_tool"] == expected_tool

    is_regression = production_success and not shadow_success

    is_improvement = not production_success and shadow_success

    if is_regression:
        regression_count += 1

    if is_improvement:
        improvement_count += 1

    shadow_records.append(
        {
            "user_request": user_request,
            "expected_tool": expected_tool,
            "production_tool": production_result["selected_tool"],
            "shadow_tool": shadow_result["selected_tool"],
            "production_success": production_success,
            "shadow_success": shadow_success,
            "is_regression": is_regression,
            "is_improvement": is_improvement,
            "production_reason": production_result["reason"],
            "shadow_reason": shadow_result["reason"],
        }
    )

shadow_summary = {
    "total_count": len(live_requests),
    "regression_count": regression_count,
    "improvement_count": improvement_count,
    "regression_rate": round(regression_count / len(live_requests), 3),
    "improvement_rate": round(improvement_count / len(live_requests), 3),
}

print("--- Shadow Deployment Summary ---")
print(json.dumps(shadow_summary, ensure_ascii=False, indent=2))

print("\n--- Shadow Deployment Records ---")
print(json.dumps(shadow_records, ensure_ascii=False, indent=2))
