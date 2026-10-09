def classify_request(user_message: str) -> str:

    if "배송" in user_message:
        return "배송 조회"

    elif "취소" in user_message:
        return "주문 취소"

    elif "환불" in user_message:
        return "환불 처리"

    return "알 수 없는 요청"

user_message = "제 주문 배송 상태를 알고 싶어요."

selected_action = classify_request(user_message)

print("선택된 작업:", selected_action)
