import asyncio
from utils import llm_call_async

# 병렬 처리할 질문과 LLM 리스트 정의
question = ("아래 문장을 자연스러운 한국어로 번역해줘.\n"
            "\"Do what you can, with what you have, where you are.\" — Theodore Roosevelt")

parallel_prompt_details = [
    {"user_prompt": question, "model": "gpt-4o"},
    {"user_prompt": question, "model": "gpt-4o-mini"},
    {"user_prompt": question, "model": "o3"},
]

# 병렬 처리 함수 선언
async def run_llm_parallel(prompt_details): 

    # 비동기 LLM 호출 작업 목록 생성
    tasks = [
        llm_call_async(prompt['user_prompt'], prompt['model'])
        for prompt in prompt_details
    ]
    responses = []

    # 작업 목록 동시 실행 및 결과 수집
    for task in asyncio.as_completed(tasks):
        result = await task
        print(result)
        responses.append(result)

    return responses

# 메인 함수 선언 및 병렬 처리 함수 실행
async def main():
    responses = await run_llm_parallel(parallel_prompt_details)

    # 최종 프롬프트 완성
    aggregator_prompt = (
        "다음은 사용자의 질문에 대해 여러 LLM이 생성한 응답이야.\n"
        "너의 역할은 이 응답을 종합해 최종 번역문을 제공하는 거야.\n"
        "일부 응답이 부정확하거나 편향될 수 있으니 신뢰성 있고 정확한 답변을 해줘.\n"
        "최종 응답만 출력해.\n\n"
        "사용자 질문:\n"
        f"{question}\n\n"
        "모델 응답:"
    )

    for i in range(len(parallel_prompt_details)):
        aggregator_prompt += f"\n{i+1}. 모델 응답: {responses[i]}\n"

    print("------------- 최종 프롬프트 -------------\n", aggregator_prompt)

    # 최종 응답 생성
    final_response = await llm_call_async(aggregator_prompt, model="gpt-4o")
    print("------------- 최종 번역문 -------------\n", final_response)

if __name__ == "__main__":
    asyncio.run(main())