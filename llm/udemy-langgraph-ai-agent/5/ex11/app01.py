import json
from langchain_openai import ChatOpenAI
from langchain_core.messages import SystemMessage, HumanMessage
llm = ChatOpenAI(model="gpt-5.4-mini", temperature=0)

validated_improvements = [
    {
        "issue_id": "I001",
        "issue_title": "배송과 취소가 함께 나온 문장을 잘못 분류하는 문제",
        "problem_pattern": "사용자 문장에 '배송'과 '취소'가 함께 나오면 track_delivery를 선택하는 경우가 있음",
        "expected_behavior": "사용자의 핵심 의도가 주문 취소이면 cancel_order를 선택해야 함",
        "validated_result": {
            "baseline_accuracy": 0.72,
            "candidate_accuracy": 0.91,
            "regression_count": 0
        }
    },
    {
        "issue_id": "I002",
        "issue_title": "환불 요청에서 refund_reason parameter가 누락되는 문제",
        "problem_pattern": "issue_refund 도구 호출 시 refund_reason 값이 비어 있음",
        "expected_behavior": "환불 도구 호출 전에 refund_reason이 없으면 추가 정보를 요청해야 함",
        "validated_result": {
            "baseline_accuracy": 0.68,
            "candidate_accuracy": 0.88,
            "regression_count": 1
        }
    }
]

def safe_parse_json(response_text: str):
    try:
        return json.loads(response_text)
    except json.JSONDecodeError:
        return {
            "error": "JSON 파싱 실패",
            "raw_response": response_text
        }

system_prompt = """
당신은 AI Agent 개선 반영을 설계하는 Patch Plan 작성자입니다.

검증된 개선안을 보고,
각 개선안을 어디에 반영해야 하는지 분류하세요.

가능한 primary_target 값:
- prompt_update
- tool_schema_update
- memory_rule
- regression_test
- offline_retraining_candidate

반드시 JSON 배열로만 답하세요.
각 항목은 다음 키를 가져야 합니다.
- issue_id
- primary_target
- secondary_targets
- patch_summary
- implementation_note
- risk_note
- required_tests
"""

improvements_text = json.dumps(validated_improvements, ensure_ascii=False, indent=2)


user_prompt = f"""
다음 검증된 개선안 목록을 보고 Patch Plan을 작성하세요.

검증된 개선안 목록:
{improvements_text}
"""

messages = [
    SystemMessage(content=system_prompt),
    HumanMessage(content=user_prompt),
]

response = llm.invoke(messages)
patch_plan = safe_parse_json(response.content)
print(json.dumps(patch_plan, ensure_ascii=False, indent=2))
