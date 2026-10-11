import json
from langchain_openai import ChatOpenAI
from langchain_core.messages import SystemMessage, HumanMessage
llm = ChatOpenAI(model="gpt-5.4-mini", temperature=0)

baseline_prompt = """
당신은 고객 지원 Agent입니다.
사용자 요청을 읽고 가장 적절한 도구 하나를 선택하세요.

사용 가능한 도구:
- cancel_order
- track_delivery
- issue_refund

반드시 JSON 형식으로만 답하세요.
{"selected_tool": "도구이름", "reason": "선택 이유"}
"""

improved_prompt = """
당신은 고객 지원 Agent입니다.
사용자 요청을 읽고 가장 적절한 도구 하나를 선택하세요.

사용 가능한 도구:
- cancel_order
- track_delivery
- issue_refund

판단 기준:
- 주문을 취소하고 싶다는 의도가 있으면 cancel_order를 선택하세요.
- 배송 위치, 택배 위치, 언제 도착하는지 묻는 요청이면 track_delivery를 선택하세요.
- 상품 파손, 깨짐, 환불, 교환 요청이면 issue_refund를 선택하세요.
- '배송 전에 주문 취소'처럼 배송과 취소가 함께 나오면 단어 하나만 보지 말고 핵심 의도를 판단하세요.
- 핵심 의도가 취소이면 cancel_order를 선택하세요.
- 주문 취소 말고 배송 상태만 알려달라는 요청은 track_delivery를 선택하세요.

반드시 JSON 형식으로만 답하세요.
{"selected_tool": "도구이름", "reason": "선택 이유"}
"""

regression_tests = [
    {
        "test_id": "T001",
        "user_request": "A12345 주문이 지금 어디쯤 배송 중인지 알려줘.",
        "expected_tool": "track_delivery",
    },
    {
        "test_id": "T002",
        "user_request": "배송 전에 주문 취소하고 싶어요.",
        "expected_tool": "cancel_order",
    },
    {
        "test_id": "T003",
        "user_request": "주문 취소 말고 배송 상태만 알려줘.",
        "expected_tool": "track_delivery",
    },
    {
        "test_id": "T004",
        "user_request": "깨진 컵이 왔어요. 환불 가능한가요?",
        "expected_tool": "issue_refund",
    },
    {
        "test_id": "T005",
        "user_request": "주문 A77777 취소해줘.",
        "expected_tool": "cancel_order",
    },
    {
        "test_id": "T006",
        "user_request": "택배가 멈춘 것 같은데 확인해줘.",
        "expected_tool": "track_delivery",
    },
]


def safe_parse_json(response_text: str):
    try:
        return json.loads(response_text)
    except json.JSONDecodeError:
        return {
            "error": "JSON 파싱 실패",
            "raw_response": response_text
        }

def run_tool_selection(system_prompt: str, user_request: str) -> dict:
    messages = [
        SystemMessage(content=system_prompt),
        HumanMessage(content=user_request),
    ]
    response = llm.invoke(messages)
    result = safe_parse_json(response.content)
    result.setdefault("selected_tool", "unknown")
    result.setdefault("reason", "이유가 제공되지 않았습니다.")
    return result

def classify_result_type(baseline_passed: bool, improved_passed: bool) -> str:
    if baseline_passed and improved_passed:
        return "maintained_success"

    if not baseline_passed and improved_passed:
        return "improvement"

    if baseline_passed and not improved_passed:
        return "regression"

    return "unresolved"




test_results = []

"""
    {
        "test_id": "T003",
        "user_request": "주문 취소 말고 배송 상태만 알려줘.",
        "expected_tool": "track_delivery",
    },
"""
for test_case in regression_tests:
    test_id = test_case["test_id"]
    user_request = test_case["user_request"]
    expected_tool = test_case["expected_tool"]
    baseline_result = run_tool_selection(baseline_prompt, user_request)
    improved_result = run_tool_selection(improved_prompt, user_request)

    baseline_passed = baseline_result["selected_tool"] == expected_tool
    improved_passed = improved_result["selected_tool"] == expected_tool

    result_type = classify_result_type(baseline_passed, improved_passed)

    test_results.append(
        {
            "test_id": test_id,
            "user_request": user_request,
            "expected_tool": expected_tool,
            "baseline_tool": baseline_result["selected_tool"],
            "improved_tool": improved_result["selected_tool"],
            "baseline_passed": baseline_passed,
            "improved_passed": improved_passed,
            "result_type": result_type,
            "baseline_reason": baseline_result["reason"],
            "improved_reason": improved_result["reason"],
        }
    )

total_count = len(test_results)
baseline_pass_count = sum(result["baseline_passed"] for result in test_results)
improved_pass_count = sum(result["improved_passed"] for result in test_results)

regression_count = sum(result["result_type"] == "regression" for result in test_results)
improvement_count = sum(result["result_type"] == "improvement" for result in test_results)

unresolved_count = sum(result["result_type"] == "unresolved" for result in test_results)

baseline_pass_rate = baseline_pass_count / total_count
improved_pass_rate = improved_pass_count / total_count

release_gate_passed = (
    regression_count == 0
    and improved_pass_rate >= baseline_pass_rate
    and unresolved_count <= 1
)

summary = {
    "total_count": total_count,
    "baseline_pass_rate": round(baseline_pass_rate, 3),
    "improved_pass_rate": round(improved_pass_rate, 3),
    "regression_count": regression_count,
    "improvement_count": improvement_count,
    "unresolved_count": unresolved_count,
    "release_gate_passed": release_gate_passed,
}

final_report = {
    "summary": summary,
    "test_results": test_results,
}

print(json.dumps(final_report, ensure_ascii=False, indent=2))





