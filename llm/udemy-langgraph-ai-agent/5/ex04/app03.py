import json
from datetime import datetime
import uuid
from statistics import mean

def record_feedback_event(request_id: str, rating: int, comment: str, did_requery: bool, did_abandon: bool) -> dict:
    timestamp = datetime.now().isoformat()
    feedback_id = f"FDB-{uuid.uuid4()}"
    is_low_rating = rating <= 3

    feedback_event = {
        "timestamp": timestamp,
        "event_name": "user_feedback_received",
        "feedback_id": feedback_id,
        "request_id": request_id,
        "rating": rating,
        "comment": comment,
        "did_requery": did_requery,
        "did_abandon": did_abandon,
        "is_low_rating": is_low_rating,
    }

    return feedback_event

def detect_query_length_drift(historical_queries: list[str], current_queries: list[str], threshold_ratio: float = 0.30) -> dict:
    historical_lengths = [len(query) for query in historical_queries]
    current_lengths = [len(query) for query in current_queries]

    historical_average = mean(historical_lengths) if historical_lengths else 0
    current_average = mean(current_lengths) if current_lengths else 0

    if historical_average == 0:
        drift_ratio = 0
    else:
        drift_ratio = abs(current_average - historical_average) / historical_average

    is_drift_detected = drift_ratio > threshold_ratio

    drift_result = {
        "historical_average_length": round(historical_average, 2),
        "current_average_length": round(current_average, 2),
        "drift_ratio": round(drift_ratio, 3),
        "threshold_ratio": threshold_ratio,
        "is_drift_detected": is_drift_detected,
    }

    return drift_result




request_id = "REQ-2026-0001"
feedback_event = record_feedback_event(
    request_id=request_id,
    rating=2,
    comment="답변이 길었지만 제가 원하는 절차가 명확하지 않았어요.",
    did_requery=True,
    did_abandon=False,
)
print("=== 사용자 피드백 이벤트 ===")
print(json.dumps(feedback_event, ensure_ascii=False, indent=2))

historical_queries = [
    "주문 취소해줘.",
    "배송 상태 알려줘.",
    "환불 가능해?",
    "주소 변경하고 싶어.",
]

current_queries = [
    "어제 결제한 상품 중에서 아직 출고되지 않은 주문만 취소 가능한지 확인해줘.",
    "배송이 늦어지고 있는데 환불이 가능한지, 아니면 보상 정책이 있는지 알려줘.",
    "주소를 바꾸고 싶은데 이미 배송 준비 중이면 어떤 절차를 따라야 하는지 설명해줘.",
    "컵이 깨져서 왔는데 사진을 보내면 교환이 빠른지 환불이 빠른지 비교해서 알려줘.",
]

drift_result = detect_query_length_drift(
    historical_queries=historical_queries,
    current_queries=current_queries,
    threshold_ratio=0.30,
)

print("\n=== 질문 길이 Drift 감지 결과 ===")
print(json.dumps(drift_result, ensure_ascii=False, indent=2))

if drift_result["is_drift_detected"]:
    print("\n질문 길이 패턴이 과거와 크게 달라졌습니다. Dashboard에서 관련 지표를 확인해야 합니다.")
else:
    print("\n질문 길이 패턴이 현재 기준에서는 안정적입니다.")

