
# ----------------------------------------------------------
# 도시 이름을 받아 날씨 정보를 반환하는 도구 함수입니다.
# ----------------------------------------------------------
def get_weather(city_name: str) -> dict:
    return {
        "city": city_name,
        "temperature": 18,
        "condition": "흐림"
    }


# ----------------------------------------------------------
# 사용자 질문에서 도시 이름을 간단히 추출하는 함수입니다.
# ----------------------------------------------------------
def extract_city(user_query: str) -> str:
    if "뉴욕" in user_query:
        return "뉴욕"
    return "서울"


# ----------------------------------------------------------
# 어떤 도구를 쓸지 결정하는 함수입니다.
# ----------------------------------------------------------
def select_tool(user_query: str) -> str:
    if "날씨" in user_query:
        return "get_weather"

    return "none"

# ----------------------------------------------------------
# 도구 실행 결과를 최종 사용자 응답으로 바꾸는 함수입니다.
# ----------------------------------------------------------
def compose_response(weather_result: dict) -> str:
    return (
        f"{weather_result['city']}의 현재 기온은 "
        f"{weather_result['temperature']}도이고, "
        f"날씨는 {weather_result['condition']}입니다."
    )


def run_basic_execution(user_query: str) -> str:
    selected_tool = select_tool(user_query)

    if selected_tool != "get_weather":
        return "현재는 날씨 조회만 처리할 수 있습니다."

    city_name = extract_city(user_query)

    weather_result = get_weather(city_name)
    final_response = compose_response(weather_result)

    return final_response

# ----------------------------------------------------------
# 테스트 질문을 준비합니다.
# ----------------------------------------------------------
user_query = "뉴욕 날씨 알려줘"


# ----------------------------------------------------------
# 실행 결과를 출력합니다.
# ----------------------------------------------------------
print(run_basic_execution(user_query))