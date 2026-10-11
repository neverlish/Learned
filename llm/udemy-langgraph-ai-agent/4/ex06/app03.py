from langchain_openai import ChatOpenAI
from langchain_core.messages import HumanMessage

customer_request = "컵이 깨져서 도착했습니다. 환불을 받고 싶습니다."
agent_answer = "환불 요청을 확인했습니다. 사진을 보내주시면 처리하겠습니다."

json_evaluation_prompt = f"""
당신은 고객지원 AI 에이전트 응답을 평가하는 평가자입니다.

고객 요청:
{customer_request}

에이전트 답변:
{agent_answer}

평가 기준:
1. 고객의 문제를 이해했는가?
2. 환불 처리 방향을 안내했는가?
3. 고객이 다음 행동을 알 수 있는가?
4. 답변이 친절하고 자연스러운가?

반드시 아래 JSON 형식으로만 답하세요.

{{
  "score": 1부터 5까지의 숫자,
  "passed": true 또는 false,
  "reason": "짧은 한국어 설명"
}}
"""

llm = ChatOpenAI(model="gpt-5.4-mini", temperature=0)
result = llm.invoke([HumanMessage(content=json_evaluation_prompt)])
print(result.content)