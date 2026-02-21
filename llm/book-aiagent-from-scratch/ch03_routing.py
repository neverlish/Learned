from utils import llm_call

# LLM 라우팅 함수 선언
def llm_router_call(user_prompt: str) -> str:
    router_prompt = f"""
사용자 질문: {user_prompt}

위 질문에 대해 가장 적절한 유형을 하나 골라.
- 일상: 일반적인 대화, 일정 짜기, 정보 요청 등
- 빠른: 계산, 단답형 질문, 간단한 명령 등
- 코딩: 파이썬, 코드 작성, 오류 디버깅 등

단답형으로 유형만 출력해."""

    routing_result = llm_call(router_prompt).strip()
    return routing_result

# 경로별 함수 선언
# 일상 에이전트
def run_general_agent(user_prompt: str) -> str:
    prompt = f"""
너는 다재다능한 일상 도우미야.
여행 일정, 추천, 요약 등 일상적인 질문에 친절하고 유용하게 답변하지.

[사용자 질문]
{user_prompt}
"""
    return llm_call(prompt, model="gpt-4o")

# 빠른 에이전트
def run_quick_agent(user_prompt: str) -> str:
    prompt = f"""
너는 빠르고 간단한 응답을 제공하는 빠른 에이전트야.
사용자의 질문에 두괄식으로 간결하게 답변하지.

[사용자 질문]
{user_prompt}
"""
    return llm_call(prompt, model="gpt-4o-mini")

# 코딩 에이전트
def run_coding_agent(user_prompt: str) -> str:
    prompt = f"""
너는 뛰어난 코딩 비서야.
파이썬, 자바스크립트, API 개발, 오류 디버깅 등에 능숙해.
질문에 대해 최대한 정확하고 실행 가능한 코드를 제공하지.

[사용자 질문]
{user_prompt}
"""
    return llm_call(prompt, model="o3")

# 질문 입력과 유형 출력
if __name__ == "__main__":

    # 라우팅 맵 정의
    # ROUTING_MAP = {
    #     "일상": "gpt-4o",
    #     "빠른": "gpt-4o-mini",
    #     "코딩": "o3"
    # }

    queries = [
        "리스본 여행 일정을 짜줘.",
        "1 더하기 2는 뭐지?",
        "파이썬으로 API 웹 서버를 만들어줘."
    ]

    # 각 질문에 맞는 최종 응답 출력
    for query in queries:
        print("\n== 사용자 질문 ==")
        print(query)

        category = llm_router_call(query)
        
        # 라우팅 맵에 함수 대응 및 호출
        ROUTING_MAP = {
            "일상": run_general_agent,
            "빠른": run_quick_agent,
            "코딩": run_coding_agent
        }
        
        final_llm_call = ROUTING_MAP.get(category, run_general_agent)
        response = final_llm_call(query)
        
        print("[모델 응답 결과]")
        print(response)