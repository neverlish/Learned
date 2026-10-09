from langchain_openai import ChatOpenAI
from langchain_core.messages import HumanMessage

llm = ChatOpenAI(model="gpt-5.4-mini", temperature=0)

memory_buffer = []

trial_log = {
    "user_question": "상품이 깨져서 왔어요. 환불해주세요.",
    "agent_answer": "배송 상태를 확인하려면 주문 번호를 알려주세요.",
    "status": "FAIL",
    "failure_reason": "고객의 핵심 의도는 배송 조회가 아니라 파손 상품 환불 요청이었다."
}

def build_reflection_prompt(trial_log: dict) -> str:
    prompt = f"""
너는 고객센터 에이전트의 실패를 분석하는 코치입니다.

아래 실패 기록을 보고,
다음에 같은 실수를 줄이기 위한 짧은 반성문을 작성하세요.

중요한 규칙:
1. 상황을 길게 요약하지 마세요.
2. 에이전트가 무엇을 놓쳤는지 말하세요.
3. 다음에는 어떤 순서로 판단해야 하는지 말하세요.
4. 문장은 한국어로 작성하세요.
5. 출력은 3문장 이내로 작성하세요.

실패 기록:
- 사용자 질문: {trial_log["user_question"]}
- 에이전트 답변: {trial_log["agent_answer"]}
- 결과: {trial_log["status"]}
- 실패 이유: {trial_log["failure_reason"]}

반성문:
"""

    return prompt

def generate_reflection(trial_log: dict) -> str:
    reflection_prompt = build_reflection_prompt(trial_log)
    message = HumanMessage(content=reflection_prompt)
    response = llm.invoke([message])

    return response.content

def save_reflection(memory_buffer: list, reflection: str, max_size: int = 3) -> None:
    memory_buffer.append(reflection)
    if len(memory_buffer) > max_size:
        memory_buffer.pop(0)



reflection = generate_reflection(trial_log)
save_reflection(memory_buffer, reflection)


def build_answer_prompt(user_question: str, memory_buffer: list) -> str:
    reflections_text = "\n".join([f"- {reflection}" for reflection in memory_buffer])

    prompt = f"""
너는 온라인 쇼핑몰 고객센터 상담원입니다.

아래는 이전 실패에서 배운 반성문입니다.
이 내용을 참고해서 같은 실수를 반복하지 마세요.

이전 반성문:
{reflections_text}

현재 고객 질문:
{user_question}

답변 규칙:
1. 고객의 불편을 먼저 인정하세요.
2. 고객의 핵심 의도를 먼저 파악하세요.
3. 필요한 다음 행동을 간결하게 안내하세요.
4. 없는 정책은 지어내지 마세요.
5. 답변은 한국어로 작성하세요.

최종 답변:
"""

    return prompt


new_user_question = "택배를 열어보니 접시가 파손되어 있었어요. 어떻게 처리하면 되나요?"
answer_prompt = build_answer_prompt(new_user_question, memory_buffer)


answer_message = HumanMessage(content=answer_prompt)

answer_response = llm.invoke([answer_message])

print("===== 생성된 반성문 =====")
print(reflection)

print("\n===== Memory Buffer =====")
for item in memory_buffer:
    print("-", item)

print("\n===== 최종 답변 프롬프트 =====")
print(answer_prompt)


print("\n===== LLM 최종 답변 =====")
print(answer_response.content)

