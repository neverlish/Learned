def greet_user():
    return (
        "안녕하세요. 저는 주문 관련 도우미입니다.\n"
        "제가 도와드릴 수 있는 일은 다음과 같습니다.\n"
        "1) 주문 취소\n"
        "2) 배송 상태 확인\n"
        "3) 계정 정보 변경 안내\n"
        "예: '주문 취소하고 싶어요', '배송 상태 알려줘', '주소 변경하고 싶어요'\n"
        "종료하려면 '종료'라고 입력해 주세요."
    )

def normalize_text(user_input):
    return user_input.strip().lower()


def detect_intent(user_input):
    if "취소" in user_input or "주문 취소" in user_input:
        return "cancel"

    if "배송" in user_input or "상태" in user_input:
        return "delivery"

    if "계정" in user_input or "주소" in user_input or "변경" in user_input:
        return "change_info"

    return "unknown"


def make_response(intent):
    if intent == "cancel":
        return (
            "주문 취소를 도와드릴게요.\n"
            "주문번호를 알려주시면 취소 가능 여부를 먼저 확인해 보겠습니다.\n"
            "예: A12345"
        )

    if intent == "delivery":
        return (
            "배송 상태 확인을 도와드릴게요.\n"
            "주문번호를 알려주시면 현재 배송 단계를 안내하겠습니다.\n"
            "예: A12345"
        )

    if intent == "change_info":
        return (
            "계정 정보 변경 관련 안내를 도와드릴게요.\n"
            "주소 변경인지, 연락처 변경인지 알려주시면 다음 절차를 안내하겠습니다."
        )

    return (
        "제가 바로 처리할 수 없는 요청이에요.\n"
        "하지만 다음과 같은 일은 도와드릴 수 있습니다.\n"
        "- 주문 취소\n"
        "- 배송 상태 확인\n"
        "- 계정 정보 변경 안내\n"
        "원하시는 작업을 다시 말씀해 주세요."
    )

def run_chatbot():
    print(greet_user())
    while True:
        user_input = input("\n사용자 > ")
        cleaned_input = normalize_text(user_input)

        if cleaned_input == "종료":
            print("에이전트 > 이용해 주셔서 감사합니다. 다음에 또 도와드릴게요.")
            break

        intent = detect_intent(cleaned_input)

        response = make_response(intent)

        print(f"에이전트 > {response}")


run_chatbot()