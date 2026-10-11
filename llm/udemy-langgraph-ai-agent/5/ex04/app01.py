import json
from datetime import datetime

def evaluate_alert_rules(metric_snapshot: dict) -> list[dict]:
    alert_events = []
    current_time = datetime.now().isoformat()

    if metric_snapshot.get("average_latency", 0) > 3.0:
        alert_events.append({
            "timestamp": current_time,
            "severity": "warning",
            "alert_name": "high_average_latency",
            "message": "평균 응답 시간이 3초를 넘었습니다.",
            "current_value": metric_snapshot.get("average_latency"),
            "threshold": 3.0,
        })

    if metric_snapshot.get("tool_failure_rate", 0) > 0.10:
        alert_events.append({
            "timestamp": current_time,
            "severity": "critical",
            "alert_name": "high_tool_failure_rate",
            "message": "도구 호출 실패율이 10%를 넘었습니다.",
            "current_value": metric_snapshot.get("tool_failure_rate"),
            "threshold": 0.10,
        })

    if metric_snapshot.get("max_retry_count_in_session", 0) > 3:
        alert_events.append({
            "timestamp": current_time,
            "severity": "warning",
            "alert_name": "too_many_retries",
            "message": "하나의 세션에서 재시도가 3회를 넘었습니다.",
            "current_value": metric_snapshot.get("max_retry_count_in_session"),
            "threshold": 3,
        })

    if metric_snapshot.get("fallback_rate", 0) > 0.20:
        alert_events.append({
            "timestamp": current_time,
            "severity": "warning",
            "alert_name": "high_fallback_rate",
            "message": "대체 응답 비율이 20%를 넘었습니다.",
            "current_value": metric_snapshot.get("fallback_rate"),
            "threshold": 0.20,
        })

    if metric_snapshot.get("user_requery_rate", 0) > 0.25:
        alert_events.append({
            "timestamp": current_time,
            "severity": "warning",
            "alert_name": "high_user_requery_rate",
            "message": "사용자 재질문율이 25%를 넘었습니다.",
            "current_value": metric_snapshot.get("user_requery_rate"),
            "threshold": 0.25,
        })

    return alert_events

metric_snapshot = {
    "average_latency": 3.8,
    "tool_failure_rate": 0.12,
    "max_retry_count_in_session": 4,
    "fallback_rate": 0.18,
    "user_requery_rate": 0.31,
}

alert_events = evaluate_alert_rules(metric_snapshot)

print("=== 현재 지표 ===")
print(json.dumps(metric_snapshot, ensure_ascii=False, indent=2))

print("\n=== 발생한 알림 ===")
print(json.dumps(alert_events, ensure_ascii=False, indent=2))

