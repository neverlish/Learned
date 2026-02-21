import streamlit as st
import asyncio
from utils import llm_call_async

# 병렬 처리 함수 개선
async def run_llm_parallel(prompt_details):

    tasks = [
        llm_call_async(prompt["user_prompt"], prompt["model"])
        for prompt in prompt_details
    ]
    responses = []

    for task in asyncio.as_completed(tasks):
        result = await task
        responses.append(result)

    # 익스펜더에 모든 응답 포함
    with st.expander("모델 응답 전체 보기"):
        for response in responses:
            st.markdown(f" 모델 응답: {response}")

    return responses

# 에이전트 실행 함수 선언
async def run_parallel_agent(question, selected_models):
    parallel_prompt_details = [
        {"user_prompt": question, "model": model} for model in selected_models
    ]

    responses = await run_llm_parallel(parallel_prompt_details)

    aggregator_prompt = (
        "다음은 여러 LLM이 사용자의 질문에 대해 생성한 응답이야.\n"
        "너의 역할은 이 응답을 모두 종합해 최종 번역문을 제공하는 거야.\n"
        "일부 응답이 부정확하거나 편향될 수 있으니 신뢰성 있고 정확한 답변을 해줘.\n"
        "최종 응답만 출력해.\n"
        "사용자 질문:\n"
        f"{question}\n\n"
        "모델 응답:"
    )
    for i in range(len(parallel_prompt_details)):
        aggregator_prompt += f"\n{i+1}. 모델 응답: {responses[i]}\n"

    with st.expander("최종 프롬프트 보기", expanded=False):
        st.code(aggregator_prompt, language='markdown')

    final_response = await llm_call_async(aggregator_prompt, model="gpt-4o")
    st.subheader("최종 응답")
    st.markdown(final_response)

def main():
    st.title("병렬 처리 에이전트")

    # 질문 입력 및 모델 위젯 설정
    question = st.text_area(
        "✍ 사용자 질문",
        height = 100,
        value = """아래 문장을 자연스러운 한국어로 번역해줘.
"Do what you can, with what you have, where you are." — Theodore Roosevelt
""")
    model_options = ["gpt-4o", "gpt-4o-mini", "o3"]
    selected_models = st.multiselect(
        "🔍 사용할 모델을 선택하세요.",
        model_options,
        default = model_options[:3]
    )

# 에이전트 실행 버튼
    if st.button("에이전트 실행"):
        if not question.strip():
            st.warning("❗ 질문을 입력하세요.")
        elif not selected_models:
            st.warning("❗ 한 가지 이상의 모델을 선택하세요.")
        else:
            asyncio.run(run_parallel_agent(question.strip(), selected_models))

if __name__ == "__main__":
    main()