import streamlit as st
import asyncio
import json
from utils import llm_call, llm_search_async

# 주요 함수 재활용
# 오케스트레이터 프롬프트 생성
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

# 워커 프롬프트 생성
def get_worker_prompt(user_query, question, description):
    return f"""
다음 사용자 질문에서 파생된 하위 질문을 보고 응답해.
사용자 질문: {user_query}
하위 질문: {question}
하위 질문의 의도: {description}
하위 질문을 철저히 분석해 그에 대해 포괄적이고 상세하게 응답해.
웹 검색 도구를 이용해 자료 조사를 하고, 이를 반영해 응답해.
"""

# 여러 LLM 요청 병렬 실행
async def run_llm_parallel(prompt_details):
    tasks = [
        llm_search_async(item['user_prompt'], item['model'])
        for item in prompt_details
    ]
    responses = await asyncio.gather(*tasks)
    return responses

# 스트림릿 맞춤형 오케스트레이터-워커 워크플로 실행
async def run_orchestrator_workflow_streamlit(user_query):

    # 오케스트레이터 실행 및 응답 출력
    orchestrator_prompt = get_orchestrator_prompt(user_query)
    st.subheader("(1) 오케스트레이터 실행")

    with st.expander("오케스트레이터 프롬프트", expanded=False):
        st.code(orchestrator_prompt)

    orchestrator_response = llm_call(orchestrator_prompt, model="gpt-4o")

    with st.expander("오케스트레이터 응답(JSON 형식)", expanded=True):
        st.code(orchestrator_response.replace('```json', '').replace('```', ''))

    subtask_list = json.loads(
        orchestrator_response.replace('```json', '').replace('```', '')
    )

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

    # 워커 병렬 실행 및 결과 출력
    worker_responses = await run_llm_parallel(worker_prompt_details)

    st.subheader("(2) 하위 작업 병렬 실행")
    columns = st.columns(len(subtask_list))
    for i, (col, task, prompt, response) in enumerate(zip(columns, subtask_list, worker_prompt_details, worker_responses)):
        with col:
            with st.container(height=150, border=False):
                st.markdown(f"### {i+1}. 하위 질문")
                st.markdown(f"**질문:** {task['question']}")
            with st.expander("워커 프롬프트", expanded=False):
                st.code(prompt)
            with st.expander("워커 응답", expanded=True):
                st.markdown(response)

    # 애그리게이터 프롬프트 생성
    aggregator_prompt = (
        "다음은 사용자 질문을 하위 질문으로 나누고 받은 응답이야.\n"
        "이 내용을 모두 종합해 최종 보고서를 마크다운 형식으로 완성해.\n"
        "하위 질문의 응답을 최대한 포괄적이고 상세하게 포함해.\n"
        "그리고 반드시 **응답에 활용된 모든 출처는 마지막의 <출처> 섹션에 마크다운 링크 형태로 정리해 제공해줘.**\n"
        f"사용자 질문: {user_query}\n\n"
        "하위 질문 및 응답:\n"
    )

    for i in range(len(subtask_list)):
        aggregator_prompt += f"\n{i+1}. 하위 질문: {subtask_list[i]['question']}\n"
        aggregator_prompt += f" 응답: {worker_responses[i]}\n"

    st.subheader("(3) 최종 보고서 생성")
    with st.expander("애그리게이터 프롬프트", expanded=False):
        st.code(aggregator_prompt)

    # 최종 보고서 생성
    final_response = llm_call(aggregator_prompt, model="gpt-4.1")
    st.write(final_response)

# 메인 함수 실행
def main():
    st.set_page_config(page_title="오케스트레이터-워커 에이전트", layout="wide")
    st.title("오케스트레이터-워커 에이전트")
    default_query = "2025년, AI 서비스는 어떻게 발전했을까?"
    user_query = st.text_input("사용자 질문", value=default_query)

    if st.button("에이전트 실행"):
        asyncio.run(run_orchestrator_workflow_streamlit(user_query))

if __name__ == "__main__":
    main()