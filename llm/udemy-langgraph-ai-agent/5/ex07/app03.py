improvement_candidates = [
    {
        "issue_id": "I001",
        "issue_title": "배송 조회 요청을 주문 취소로 오해하는 문제",
        "frequency": 5,
        "severity": 3,
        "effort": 1,
        "recurrence": 5,
        "candidate_fix": "배송 관련 표현을 track_delivery 도구와 더 강하게 연결하는 예시를 추가한다.",
    },
    {
        "issue_id": "I002",
        "issue_title": "환불 요청에서 refund_reason parameter가 누락되는 문제",
        "frequency": 3,
        "severity": 5,
        "effort": 2,
        "recurrence": 4,
        "candidate_fix": "issue_refund 도구 호출 전에 refund_reason 값이 있는지 검증한다.",
    },
    {
        "issue_id": "I003",
        "issue_title": "응답 문장이 너무 일반적이라 사용자가 다음 행동을 알기 어려운 문제",
        "frequency": 4,
        "severity": 2,
        "effort": 1,
        "recurrence": 3,
        "candidate_fix": "응답 마지막에 사용자가 해야 할 다음 행동을 한 문장으로 안내한다.",
    },
    {
        "issue_id": "I004",
        "issue_title": "드문 표현의 배송 요청을 unknown intent로 처리하는 문제",
        "frequency": 1,
        "severity": 2,
        "effort": 4,
        "recurrence": 2,
        "candidate_fix": "드문 배송 표현을 추가 예시 데이터로 보강한다.",
    },
]

def calculate_priority_score(candidate: dict) -> int:
    frequency = candidate["frequency"]
    severity = candidate["severity"]
    effort = candidate["effort"]
    recurrence = candidate["recurrence"]

    priority_score = frequency + severity + recurrence - effort
    return priority_score


for candidate in improvement_candidates:
    candidate["priority_score"] = calculate_priority_score(candidate)

sorted_candidates = sorted(
    improvement_candidates,
    key=lambda item: item["priority_score"],
    reverse=True,
)

print(sorted_candidates)

