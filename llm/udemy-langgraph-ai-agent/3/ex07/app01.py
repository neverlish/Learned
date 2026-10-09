from langchain_openai import ChatOpenAI
from langchain_core.messages import HumanMessage

llm = ChatOpenAI(model="gpt-5.4-mini", temperature=0)

case_description = """
온라인 쇼핑몰 고객센터 에이전트가 있습니다.
Prompt를 여러 번 수정했고, 좋은 답변 예시도 넣었습니다.
실패 후 Reflection도 넣어보았습니다.

그런데 여전히 다음 문제가 반복됩니다.

1. 파손 상품 환불 요청을 배송 조회로 잘못 분류합니다.
2. 답변을 반드시 JSON 형식으로 내야 하는데 필드 이름을 자주 틀립니다.
3. 고객 감정 공감 문장을 자주 빠뜨립니다.
4. 최근 2,000건의 상담 데이터 중 사람이 검수한 좋은 답변 데이터 600건이 있습니다.
"""


def build_decision_prompt(case_description: str) -> str:
    prompt = f"""
너는 AI 에이전트 개선 전략을 검토하는 A사의 시니어 개발자입니다.

아래 상황을 보고,
Fine-tuning이 필요한지 판단하세요.

판단 기준:
1. Prompt 수정으로 해결 가능한 문제인지 확인하세요.
2. Example 추가로 해결 가능한 문제인지 확인하세요.
3. Reflection으로 해결 가능한 문제인지 확인하세요.
4. 반복 실패가 구조적인지 확인하세요.
5. 학습에 쓸 좋은 데이터가 충분한지 확인하세요.

상황:
{case_description}

출력 형식:
- 최종 판단:
- 이유:
- 먼저 시도할 것:
- Fine-tuning을 한다면 필요한 데이터:
"""

    return prompt


decision_prompt = build_decision_prompt(case_description)

message = HumanMessage(content=decision_prompt)

response = llm.invoke([message])

print("===== Fine-tuning 판단 프롬프트 =====")
print(decision_prompt)

print("\n===== LLM 판단 결과 =====")
print(response.content)