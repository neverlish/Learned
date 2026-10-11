from langchain_openai import ChatOpenAI

from langchain_core.messages import HumanMessage

llm = ChatOpenAI(model="gpt-5.4-mini", temperature=0)

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

reflection_prompt = build_reflection_prompt(trial_log)
message = HumanMessage(content=reflection_prompt)

response = llm.invoke([message])
reflection = response.content

print("===== 반성문 생성 프롬프트 =====")
print(reflection_prompt)

print("\n===== 생성된 반성문 =====")
print(reflection)