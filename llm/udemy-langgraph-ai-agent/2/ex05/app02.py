# ------------------------------------------------------------
# ReAct Agent Example
# 생각(Reason)과 행동(Action)을 반복하면서 문제를 해결합니다.
# ------------------------------------------------------------

def search_weather(city: str) -> str:
    fake_weather_data = {
        "서울": "서울 날씨는 흐리고 18°C입니다.",
        "부산": "부산의 날씨는 맑고 21°C입니다.",
    }
    return fake_weather_data.get(city.lower(), "기상 데이터가 없음.")

def react_agent(user_question: str) -> str:
    question = user_question.lower()

    thought_log = []
    observation_log = []

    thought_log.append("생각 1: 사용자의 의도를 파악해야 합니다.")

    if "날씨" in question:
        thought_log.append("생각 2: 이건 날씨 질문처럼 보입니다.")
        thought_log.append("행동 1: 도시 이름 추출 및 날씨 호출 도구.")

        if "서울" in question:
            city = "서울"
        elif "부산" in question:
            city = "부산"
        else:
            city = "불명"

        observation = search_weather(city)
        observation_log.append(f"관찰 1: {observation}")

        thought_log.append("생각 3: 도구 결과를 받았습니다. 이제 대답할 수 있습니다.")
        return "\n".join(thought_log + observation_log + [f"최종 답변: {observation}"])

    thought_log.append("생각 2: 이 요청에 적합한 툴 경로를 찾을 수가 없습니다.")
    return "\n".join(thought_log + ["최종 답변: 이 질문에 대해 다른 전략이 필요합니다."])


print("=== ReAct Agent ===")
print(react_agent("오늘 대전 날씨는 어때?"))
print()
print(react_agent("회사 전략 설계를 도와주실 수 있나요?"))