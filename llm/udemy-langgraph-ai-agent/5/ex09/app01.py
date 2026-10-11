import json
from langchain_openai import ChatOpenAI
from langchain_core.messages import SystemMessage, HumanMessage
llm = ChatOpenAI(model="gpt-5.4-mini", temperature=0)

available_tools = ["cancel_order", "track_delivery", "issue_refund"]

baseline_prompt = f"""
당신은 고객 지원 Agent입니다.
사용자 요청을 읽고 아래 도구 중 가장 적절한 도구 하나를 선택하세요.

사용 가능한 도구:
{available_tools}

반드시 JSON 형식으로만 답하세요.
예:
{{"selected_tool": "track_delivery", "reason": "배송 상태 확인 요청입니다."}}
"""

candidate_prompt = f"""
당신은 고객 지원 Agent입니다.
사용자 요청을 읽고 아래 도구 중 가장 적절한 도구 하나를 선택하세요.

사용 가능한 도구:
{available_tools}

판단 기준:
- 주문을 취소하고 싶다는 의도가 있으면 cancel_order를 선택하세요.
- 배송 위치, 택배 위치, 언제 도착하는지 묻는 요청이면 track_delivery를 선택하세요.
- 상품 파손, 환불, 교환 요청이면 issue_refund를 선택하세요.
- '배송 전에 주문 취소'처럼 배송과 취소가 함께 나오면 cancel_order를 우선 고려하세요.
- 환불 요청에서 환불 사유가 없으면 issue_refund를 선택하되, reason에 추가 정보가 필요하다고 적으세요.

반드시 JSON 형식으로만 답하세요.
예:
{{"selected_tool": "track_delivery", "reason": "배송 상태 확인 요청입니다."}}
"""

test_cases = [
    {"user_request": "A12345 주문이 지금 어디쯤 배송 중인지 알려줘.", "expected_tool": "track_delivery"},
    {"user_request": "내 택배 어디 있어?", "expected_tool": "track_delivery"},
    {"user_request": "주문한 컵 언제 와?", "expected_tool": "track_delivery"},
    {"user_request": "택배가 멈춘 것 같은데 확인해줘.", "expected_tool": "track_delivery"},
    {"user_request": "배송 전에 주문 취소하고 싶어요.", "expected_tool": "cancel_order"},
    {"user_request": "A12345 주문 취소해줘.", "expected_tool": "cancel_order"},
    {"user_request": "아직 배송 전이면 취소 가능해?", "expected_tool": "cancel_order"},
    {"user_request": "깨진 컵이 왔어요. 환불 가능한가요?", "expected_tool": "issue_refund"},
    {"user_request": "A77777 환불해줘.", "expected_tool": "issue_refund"},
    {"user_request": "상품이 파손돼서 교환이나 환불 받고 싶어요.", "expected_tool": "issue_refund"},
]

def safe_parse_json(response_text: str) -> dict:
    try:
        return json.loads(response_text)
    except json.JSONDecodeError:
        return {
            "selected_tool": "unknown",
            "reason": "JSON 파싱 실패"
        }


def choose_tool(system_prompt: str, user_request: str) -> dict:
    messages = [
        SystemMessage(content=system_prompt),
        HumanMessage(content=user_request),
    ]
    response = llm.invoke(messages)
    result = safe_parse_json(response.content)

    result.setdefault("selected_tool", "unknown")
    result.setdefault("reason", "이유가 제공되지 않았습니다.")
    return result


def evaluate_prompt(prompt_name: str, system_prompt: str, cases: list) -> dict:
    results = []
    success_count = 0

    for case in cases:
        user_request = case["user_request"]
        expected_tool = case["expected_tool"]

        tool_result = choose_tool(system_prompt, user_request)
        selected_tool = tool_result["selected_tool"]
        is_success = selected_tool == expected_tool

        if is_success:
            success_count += 1

        results.append(
            {
                "prompt_name": prompt_name,
                "user_request": user_request,
                "expected_tool": expected_tool,
                "selected_tool": selected_tool,
                "is_success": is_success,
                "reason": tool_result["reason"],
            }
        )

    tool_accuracy = success_count / len(cases)

    return {
        "prompt_name": prompt_name,
        "tool_accuracy": round(tool_accuracy, 3),
        "success_count": success_count,
        "total_count": len(cases),
        "results": results,
    }



baseline_report = evaluate_prompt("baseline", baseline_prompt, test_cases)

candidate_report = evaluate_prompt("candidate", candidate_prompt, test_cases)

comparison_summary = {
    "baseline_tool_accuracy": baseline_report["tool_accuracy"],
    "candidate_tool_accuracy": candidate_report["tool_accuracy"],
    "baseline_success_count": baseline_report["success_count"],
    "candidate_success_count": candidate_report["success_count"],
    "total_count": len(test_cases),
}

print("--- Offline Evaluation Summary ---")
print(json.dumps(comparison_summary, ensure_ascii=False, indent=2))

print("\n--- Baseline Results ---")
print(json.dumps(baseline_report["results"], ensure_ascii=False, indent=2))

print("\n--- Candidate Results ---")
print(json.dumps(candidate_report["results"], ensure_ascii=False, indent=2))