from langchain_openai import ChatOpenAI
from langchain_core.messages import HumanMessage

customer_request = "컵이 깨져서 도착했습니다. 환불을 받고 싶습니다."

agent_answer = "불편을 드려 마음이 좋지 않습니다. 환불을 도와드리겠습니다."


evaluation_prompt = f"""
당신은 고객지원 AI 에이전트 응답을 평가하는 평가자입니다.

고객 요청:
{customer_request}

에이전트 답변:
{agent_answer}

다음 기준으로 평가해 주세요.

1. 고객의 문제를 정확히 이해했는가?
2. 환불 처리 방향을 분명히 안내했는가?
3. 고객이 다음에 무엇을 해야 하는지 알 수 있는가?
4. 말투가 자연스럽고 친절한가?

출력 형식은 반드시 아래처럼 작성해 주세요.

점수: 1~5 사이의 숫자
이유: 짧은 한국어 설명
"""

llm = ChatOpenAI(model="gpt-5.4-mini", temperature=0)
result = llm.invoke([HumanMessage(content=evaluation_prompt)])
print(result.content)

