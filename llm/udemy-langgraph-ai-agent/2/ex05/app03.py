# ------------------------------------------------------------
# '먼저 계획을 세우고 나중에 실행한다'
# Planner 예제입니다.
# ------------------------------------------------------------

def planner_agent(user_question: str) -> str:
    question = user_question.lower().strip()

    plan_steps = []

    plan_steps.append("1단계: 사용자 요청의 의도를 분류합니다.")

    if "날씨" in question:
        plan_steps.append("2단계: 지역 정보가 있는지 확인합니다.")
        plan_steps.append("3단계: 날씨 도구를 호출합니다.")
        plan_steps.append("4단계: 결과를 자연어로 정리합니다.")

    elif "주가" in question:
        plan_steps.append("2단계: 종목명을 확인합니다.")
        plan_steps.append("3단계: 주가 도구를 호출합니다.")
        plan_steps.append("4단계: 가격과 핵심 요약을 만듭니다.")

    elif "취소" in question:
        plan_steps.append("2단계: 주문 번호를 확인합니다.")
        plan_steps.append("3단계: 취소 가능 상태인지 확인합니다.")
        plan_steps.append("4단계: 취소 작업을 실행합니다.")
        plan_steps.append("5단계: 사용자에게 결과를 안내합니다.")

    else:
        plan_steps.append("2단계: 요청이 모호한지 판단합니다.")
        plan_steps.append("3단계: 필요한 정보를 다시 질문합니다.")

    return "\n".join(plan_steps)


print(planner_agent("제 주문 A12345를 취소해 주세요"))
print()
print(planner_agent("오늘 부산의 날씨는 어때?"))
print()
print(planner_agent("복잡한 일이 필요해"))