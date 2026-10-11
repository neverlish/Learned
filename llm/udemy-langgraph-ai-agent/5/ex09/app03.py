import json
from langchain_openai import ChatOpenAI
from langchain_core.messages import SystemMessage, HumanMessage
llm = ChatOpenAI(model="gpt-5.4-mini", temperature=0)

ab_test_events = [
    {"variant": "A", "task_success": True, "latency_ms": 1200, "user_rating": 4},
    {"variant": "A", "task_success": True, "latency_ms": 1300, "user_rating": 4},
    {"variant": "A", "task_success": False, "latency_ms": 1100, "user_rating": 2},
    {"variant": "A", "task_success": True, "latency_ms": 1250, "user_rating": 4},
    {"variant": "A", "task_success": True, "latency_ms": 1400, "user_rating": 5},
    {"variant": "A", "task_success": False, "latency_ms": 1500, "user_rating": 2},
    {"variant": "B", "task_success": True, "latency_ms": 1500, "user_rating": 5},
    {"variant": "B", "task_success": True, "latency_ms": 1600, "user_rating": 5},
    {"variant": "B", "task_success": True, "latency_ms": 1550, "user_rating": 4},
    {"variant": "B", "task_success": True, "latency_ms": 1700, "user_rating": 5},
    {"variant": "B", "task_success": True, "latency_ms": 1650, "user_rating": 4},
    {"variant": "B", "task_success": False, "latency_ms": 2200, "user_rating": 2},
]


def calculate_metrics(events: list, variant_name: str) -> dict:
    filtered_events = [event for event in events if event["variant"] == variant_name]
    total_count = len(filtered_events)
    success_count = sum(event["task_success"] for event in filtered_events)
    success_rate = success_count / total_count
    average_latency_ms = sum(event["latency_ms"] for event in filtered_events) / total_count
    average_rating = sum(event["user_rating"] for event in filtered_events) / total_count

    return {
        "variant": variant_name,
        "total_count": total_count,
        "success_count": success_count,
        "success_rate": round(success_rate, 3),
        "average_latency_ms": round(average_latency_ms, 1),
        "average_rating": round(average_rating, 2),
    }


metrics_a = calculate_metrics(ab_test_events, "A")

metrics_b = calculate_metrics(ab_test_events, "B")

business_rule = {
    "minimum_success_rate_gain": 0.05,
    "maximum_latency_increase_ms": 500,
    "minimum_average_rating": 4.0,
}

success_rate_gain = metrics_b["success_rate"] - metrics_a["success_rate"]

latency_increase_ms = metrics_b["average_latency_ms"] - metrics_a["average_latency_ms"]

if (
    success_rate_gain >= business_rule["minimum_success_rate_gain"]
    and latency_increase_ms <= business_rule["maximum_latency_increase_ms"]
    and metrics_b["average_rating"] >= business_rule["minimum_average_rating"]
):
    rule_based_decision = "rollout"
elif metrics_b["success_rate"] < metrics_a["success_rate"]:
    rule_based_decision = "rollback"
else:
    rule_based_decision = "hold"

experiment_summary = {
    "baseline": metrics_a,
    "candidate": metrics_b,
    "success_rate_gain": round(success_rate_gain, 3),
    "latency_increase_ms": round(latency_increase_ms, 1),
    "business_rule": business_rule,
    "rule_based_decision": rule_based_decision,
}

system_prompt = """
당신은 AI Agent A/B 테스트 결과를 해석하는 배포 판단 분석가입니다.

주어진 실험 요약을 보고 다음 항목을 JSON으로만 작성하세요.

- decision: rollout, hold, rollback 중 하나
- reason: 판단 이유
- risks: 남아 있는 위험 목록
- next_step: 다음 조치
- metrics_to_monitor: 계속 관찰할 지표 목록

주의:
성공률만 보지 말고 지연 시간과 사용자 평점도 함께 고려하세요.
Python 코드가 계산한 rule_based_decision을 참고하되, 남은 위험도 함께 설명하세요.
"""

summary_text = json.dumps(experiment_summary, ensure_ascii=False, indent=2)
user_prompt = f"""
다음 A/B 테스트 결과를 보고 배포 여부를 판단하세요.

실험 요약:
{summary_text}
"""

messages = [
    SystemMessage(content=system_prompt),
    HumanMessage(content=user_prompt),
]

response = llm.invoke(messages)
decision_report = response.content

print("--- A/B Test Summary ---")
print(json.dumps(experiment_summary, ensure_ascii=False, indent=2))

print("\n--- Deployment Decision Report ---\n")
print(decision_report)