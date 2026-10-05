from dataclasses import dataclass
from typing import Optional

@dataclass
class ConversationState:
    last_intent: Optional[str] = None
    last_order_id: Optional[str] = None
    user_prefers_short: bool = False

def greet_user() -> str:
    return (
        "안녕하세요. 저는 주문 지원 도우미입니다.\n"
        "제가 도와드릴 수 있는 일은 다음과 같습니다.\n"
        "- 주문 취소 가능 여부 안내\n"
        "- 배송 상태 확인 안내\n"
        "- 주소 변경 절차 안내\n"
        "직접 결제를 실행하거나 환불을 확정 처리하지는 못합니다.\n"
        "원하시는 작업을 말씀해 주세요. 종료하려면 '종료'라고 입력해 주세요."
    )

def normalize_text(text: str) -> str:
    return text.strip().lower()

import re
def extract_order_id(text: str) -> Optional[str]:
    parts = text.split()

    for part in parts: # 아 주문번호는 a12345번이야.

        match = re.match(r"A\d+", part.upper())

        if match:
            return match.group()

    return None

def detect_intent(user_text: str) -> str:
    if "취소" in user_text:
        return "cancel"

    if "배송" in user_text or "상태" in user_text:
        return "delivery"

    if "주소" in user_text or "변경" in user_text:
        return "address_change"

    if "짧게" in user_text:
        return "preference_short"

    if "길게" in user_text:
        return "preference_long"


    return "unknown"

def style_message(state: ConversationState, long_text: str, short_text: str) -> str:
    if state.user_prefers_short:
        return short_text
    return long_text

def build_uncertainty_message() -> str:
    return (
        "현재 정보만으로는 바로 단정하기 어렵습니다.\n"
        "가능성이 가장 높은 방향으로 안내드릴 수는 있지만,\n"
        "주문 상태나 최근 변경 이력에 따라 결과가 달라질 수 있습니다."
    )

def build_fallback_message() -> str:
    return (
        "지금 요청은 제가 바로 처리하기 어려운 범위예요.\n"
        "대신 주문 취소 가능 여부 안내, 배송 상태 확인, 주소 변경 절차 안내는 도와드릴 수 있습니다.\n"
        "원하시는 작업을 다시 말씀해 주시면 그 흐름으로 이어가겠습니다."
    )

def respond(state: ConversationState, user_text: str) -> str:
    found_order_id = extract_order_id(user_text)
    if found_order_id is not None:
        state.last_order_id = found_order_id

    intent = detect_intent(user_text)

    if intent == "preference_short":
        state.user_prefers_short = True
        return "앞으로는 조금 더 짧고 간단하게 안내드릴게요."

    if intent == "preference_long":
        state.user_prefers_short = False
        return "앞으로는 조금 더 길고 자세하게 안내드릴게요."

    if intent == "cancel":
        state.last_intent = "cancel"

        if state.last_order_id is None:
            return style_message(
                state,
                "주문 취소 가능 여부를 확인해 드릴게요.\n먼저 주문번호를 알려주세요. 예: A12345",
                "주문번호를 알려주세요. 예: A12345"
            )

        return style_message(
            state,
            f"{state.last_order_id} 주문의 취소 가능 여부를 안내해 드릴게요.\n"
            "다만 현재는 실제 취소를 확정 실행하지는 못하고, 가능 여부와 다음 절차만 안내할 수 있습니다.",
            f"{state.last_order_id} 주문은 취소 가능 여부만 안내할 수 있습니다."
        )

    if intent == "delivery":
        state.last_intent = "delivery"

        if state.last_order_id is None:
            return style_message(
                state,
                "배송 상태를 안내해 드릴게요.\n주문번호를 알려주시면 현재 단계 확인 흐름으로 이어가겠습니다.",
                "주문번호를 알려주세요."
            )

        return style_message(
            state,
            f"{state.last_order_id} 주문의 배송 상태를 확인하는 흐름으로 이어가겠습니다.\n"
            "현재 예제에서는 실제 배송 조회 API는 연결되어 있지 않아, 절차와 화면 흐름만 안내합니다.",
            f"{state.last_order_id} 주문 배송 확인 흐름으로 이어갑니다."
        )

    if intent == "address_change":
        state.last_intent = "address_change"

        return style_message(
            state,
            "주소 변경 절차를 안내해 드릴게요.\n"
            + build_uncertainty_message()
            + "\n일반적으로는 주문번호 확인 후, 배송 준비 이전 단계인지 먼저 살펴봐야 합니다.",
            "주소 변경은 주문 상태에 따라 가능 여부가 달라질 수 있습니다."
        )

    if "그거" in user_text or "아까" in user_text or "그 주문" in user_text:
        if state.last_intent is not None and state.last_order_id is not None:
            return (
                f"방금 이어서 말씀하신 내용은 {state.last_order_id} 주문의 "
                f"{state.last_intent} 흐름으로 이해했습니다.\n"
                "원하시면 이 기준으로 다음 단계를 계속 안내하겠습니다."
            )

        if state.last_intent is not None:
            return (
                f"이전 흐름은 기억하고 있어요. 최근 요청은 {state.last_intent} 관련이었습니다.\n"
                "다만 주문번호가 아직 없어 정확히 이어가려면 주문번호가 필요합니다."
            )

    if "확실" in user_text or "정말" in user_text:
        return (
            "현재 주어진 정보 범위에서는 가장 가능성이 높은 안내를 드리고 있습니다.\n"
            "다만 실제 처리 가능 여부는 주문 상태와 최근 변경 이력에 따라 달라질 수 있어요.\n"
            "원하시면 제가 필요한 확인 항목부터 차근차근 정리해 드리겠습니다."
        )

    return build_fallback_message()


def run_chatbot() -> None:
    state = ConversationState()

    print(greet_user())

    while True:
        raw_input_text = input("\n사용자 > ")

        cleaned_text = normalize_text(raw_input_text)

        if cleaned_text == "종료":
            print("에이전트 > 이용해 주셔서 감사합니다. 다음에 또 도와드릴게요.")
            break

        answer = respond(state, cleaned_text)

        print(f"에이전트 > {answer}")

if __name__ == "__main__":
    run_chatbot()
