def reflex_agent(user_question: str) -> str:
    question = user_question.lower().strip()

    if "날씨" in question:
        return "날씨 요청으로 판단했습니다. 날씨 도구를 바로 호출합니다."

    if "주가" in question:
        return "주가 요청으로 판단했습니다. 주가 도구를 바로 호출합니다."

    if "취소" in question:
        return "취소 요청으로 판단했습니다. 주문 취소 도구를 바로 호출합니다."

    return "정의된 규칙에 없는 요청입니다. 추가 판단이 어렵습니다."


print(reflex_agent("서울 날씨 확인해 주세요"))
print(reflex_agent("주문을 취소하고 싶어요"))
print(reflex_agent("애플 주가를 말해 주세요"))
print(reflex_agent("이 비즈니스 문제를 분석하는 데 도움을 주세요"))