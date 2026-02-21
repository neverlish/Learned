from utils import llm_call
from typing import List

def prompt_chain_workflow(initial_input: str, prompt_chain: List[str]) -> str:
    response_chain = []
    response = initial_input

    # 단계별 프롬프트와 이전 응답을 이어서 LLM 호출
    for i, prompt in enumerate(prompt_chain, 1):
        print(f"\n============ {i} 단계 ============\n")
        
        # 최종 프롬프트 작성
        final_prompt = f"""{prompt}
        
처음에 사용자가 입력한 내용은 다음과 같아. 응답할 때 항상 이 내용을 고려해.
{initial_input}

또한 응답 시 아래 내용도 참고해.
{response}"""
            
        print(f"🔹 프롬프트:\n{final_prompt}\n")
        response = llm_call(final_prompt)
        response_chain.append(response)
        print(f"✅ 응답:\n{response}\n")
        
    return response_chain

if __name__ == "__main__":
    # 단계별 프롬프트 생성
    prompts = [
# 1단계: 여행 후보지 세 곳 추천
"""사용자의 여행 취향을 바탕으로 적합한 여행지 세 곳을 추천해.
- 사용자가 입력한 내용을 요약해.
- 추천한 여행지가 왜 적합한지 설명해.
- 각 여행지의 기후, 주요 관광지를 알려줘.""",

# 2단계: 한 곳을 선택하고 다섯 가지 활동 나열
"""가장 추천하는 여행지 한 곳을 선정하고, 거기서 할 수 있는 활동을 제안해.
- 왜 최종 여행지로 선정했는지 설명해.
- 해당 여행지에서 즐길 수 있는 다섯 가지 활동을 나열해.
- 자연 탐방, 역사 탐방, 음식 체험 등 다양한 영역의 활동을 골라줘.""",

# 3단계: 최종 추천 여행지의 하루 일정 계획
"""추천한 여행지의 하루 일정 계획을 세워줘.
- 오전, 오후, 저녁으로 나눠 일정을 짜줘.
- 각 시간대에 어떤 활동을 하면 좋을지 설명해.""",
    ]
    
    # 여행 스타일 입력 및 프롬프트 체이닝 함수 호출
    # 입력 예: 따뜻한 날씨를 좋아하고 역사적인 장소를 둘러보는 걸 선호해.
    user_input = input("여행 스타일 입력: \n")
    results = prompt_chain_workflow(user_input, prompts)

    # 최종 응답 출력
    print("============ 최종 응답 ============")
    print(results[-1])