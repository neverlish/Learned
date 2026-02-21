import asyncio
import json
# 웹 검색 LLM 호출 함수 임포트
from utils import llm_call, llm_search_async

# 오케스트레이터 프롬프트 생성 함수 선언
def get_orchestrator_prompt(user_query):
    return f"""
다음 사용자 질문을 분석한 뒤, 이를 3개 이내의 관련 하위 질문으로 분해해.
결과는 JSON 배열로 출력해.
JSON 배열 안의 각 하위 질문은 다음 형식을 따르는 JSON 객체로 만들어.
[
    {{
        "question": "하위 질문 1",
        "description": "이 하위 질문의 요지와 의도에 대한 설명"
    }},
    {{
        "question": "하위 질문 2",
        "description": "이 하위 질문의 요지와 의도에 대한 설명"
    }}
]

사용자 질문: {user_query}
"""

# 워커 프롬프트 생성 함수 선언
def get_worker_prompt(user_query, question, description):
    return f"""
다음 사용자 질문에서 파생된 하위 질문을 보고 응답해.
사용자 질문: {user_query}
하위 질문: {question}
하위 질문의 의도: {description}
하위 질문을 철저히 분석해 그에 대해 포괄적이고 상세하게 응답해.
웹 검색 도구를 이용해 자료 조사를 하고, 이를 반영해 응답해.
"""

# 여러 LLM 요청 병렬 실행 함수 선언
async def run_llm_parallel(prompt_details):
    tasks = [
        llm_search_async(item['user_prompt'], item['model'])
        for item in prompt_details
    ]
    responses = await asyncio.gather(*tasks)
    return responses

# 오케스트레이터-워커 워크플로 실행 함수 선언
async def run_orchestrator_workflow(user_query):
    orchestrator_prompt = get_orchestrator_prompt(user_query)
    orchestrator_response = llm_call(orchestrator_prompt, model="gpt-4o")

    # LLM 응답 앞뒤에 붙은 ```json{…}``` 마크다운 코드 블록 제거
    subtask_list = json.loads(
        orchestrator_response.replace('```json', '').replace('```', '')
    )

    # 하위 질문 출력
    for i, subtask in enumerate(subtask_list, start=1):
        print(f"\n--- 하위 질문 {i} ---")
        print("질문:", subtask['question'])
        print("설명:", subtask['description'])
    
    # 워커 작업 목록 생성
    worker_prompt_details = [
        {
            "user_prompt": get_worker_prompt(
                user_query,
                subtask["question"],
                subtask["description"]
            ),
            "model": "gpt-4.1"
        }
        for subtask in subtask_list
    ]

    # 첫 번째 워커 프롬프트 테스트 출력
    print("\n=========== 샘플 워커 프롬프트 ===========")
    print(worker_prompt_details[0]['user_prompt'])

    # 워커 병렬 실행 후 응답 출력
    worker_responses = await run_llm_parallel(worker_prompt_details)

    print("\n=========== 워커 응답 결과 ===========")
    for i, response in enumerate(worker_responses, 1):
        print(f"\n--- 하위 질문 {i} 응답 ---")
        print(response)

    # 애그리게이터 프롬프트 생성
    aggregator_prompt = (
        "다음은 사용자 질문을 하위 질문으로 나누고 받은 응답이야.\n"
        "이 내용을 모두 종합해 최종 답변을 해.\n"
        "하위 질문의 응답을 최대한 포괄적이고 상세하게 포함해.\n"
        f"사용자 질문: {user_query}\n\n"
        "하위 질문 및 응답:\n"
    )

    for i, task in enumerate(subtask_list):
        aggregator_prompt += f"\n{i+1}. 하위 질문: {task['question']}\n"
        aggregator_prompt += f" 응답: {worker_responses[i]}\n"

    print("\n====== 애그리게이터 프롬프트 ======\n", aggregator_prompt)

    # 최종 보고서 생성
    final_response = llm_call(aggregator_prompt, model="gpt-4.1")
    print("\n=========== 최종 보고서 결과 ===========")
    print(final_response)

# 메인 함수 선언 및 워크플로 실행
async def main():
    user_query = "2025년, AI 서비스는 어떻게 발전했을까?"
    final_output = await run_orchestrator_workflow(user_query)

if __name__ == "__main__":
    asyncio.run(main())