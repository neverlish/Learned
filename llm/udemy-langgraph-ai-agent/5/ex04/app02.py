import time
import uuid
import json
from langchain_openai import ChatOpenAI
from langchain_core.messages import HumanMessage
from langchain_core.messages import SystemMessage

llm = ChatOpenAI(model="gpt-5.4-mini", temperature=0)

def run_versioned_agent(user_message: str, request_id: str, agent_version: str, system_rule: str) -> dict:
    start_time = time.time()
    messages = [
        SystemMessage(content=system_rule),
        HumanMessage(content=user_message),
    ]

    is_success = False
    error_message = None
    response_text = ""

    try:
        response = llm.invoke(messages)
        response_text = response.content

        is_success = True
    except Exception as error:
        error_message = str(error)

    end_time = time.time()
    latency_seconds = round(end_time - start_time, 3)

    versioned_result = {
        "request_id": request_id,
        "agent_version": agent_version,
        "user_message": user_message,
        "response_text": response_text,
        "is_success": is_success,
        "latency_seconds": latency_seconds,
        "error_message": error_message,
        "response_length": len(response_text),
    }

    return versioned_result


def compare_shadow_result(baseline_result: dict, shadow_result: dict) -> dict:
    latency_difference = round(
        shadow_result["latency_seconds"] - baseline_result["latency_seconds"],
        3,
    )

    response_length_difference = shadow_result["response_length"] - baseline_result["response_length"]

    success_changed = baseline_result["is_success"] != shadow_result["is_success"]
    comparison_result = {
        "request_id": baseline_result["request_id"],
        "baseline_version": baseline_result["agent_version"],
        "shadow_version": shadow_result["agent_version"],
        "latency_difference": latency_difference,
        "response_length_difference": response_length_difference,
        "success_changed": success_changed,
        "baseline_success": baseline_result["is_success"],
        "shadow_success": shadow_result["is_success"],
    }

    return comparison_result



request_id = f"REQ-{uuid.uuid4()}"

user_message = "배송이 늦어졌을 때 고객에게 어떻게 안내해야 하는지 짧게 답해줘."

baseline_rule = "당신은 고객 지원 Agent입니다. 짧고 안정적으로 답변하세요."


baseline_result = run_versioned_agent(
    user_message=user_message,
    request_id=request_id,
    agent_version="baseline-v1",
    system_rule=baseline_rule,
)

shadow_rule = "당신은 고객 지원 Agent입니다. 친절하고 구체적으로 답변하되, 불필요하게 길게 말하지 마세요."

shadow_result = run_versioned_agent(
    user_message=user_message,
    request_id=request_id,
    agent_version="shadow-v2",
    system_rule=shadow_rule,
)

comparison_result = compare_shadow_result(baseline_result, shadow_result)


print("=== Baseline 결과 ===")
print(json.dumps(baseline_result, ensure_ascii=False, indent=2))

print("\n=== Shadow 결과 ===")
print(json.dumps(shadow_result, ensure_ascii=False, indent=2))

print("\n=== Shadow 비교 결과 ===")
print(json.dumps(comparison_result, ensure_ascii=False, indent=2))
