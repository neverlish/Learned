import json
from langchain_openai import ChatOpenAI
from langchain_core.messages import SystemMessage, HumanMessage
from app03 import *

llm = ChatOpenAI(model="gpt-5.4-mini", temperature=0)

system_prompt = """
당신은 AI Agent 개선 Backlog를 정리하는 운영 담당자입니다.
주어진 개선 후보 목록을 보고,
개발팀이 바로 회의에서 사용할 수 있는 Backlog 형태로 정리하세요.

반드시 JSON 배열로만 답하세요.
각 항목은 다음 키를 가져야 합니다.
- rank: 우선순위 순번
- issue_id
- issue_title
- priority_reason: 왜 이 순위인지
- recommended_action: 추천 개선 작업
- acceptance_criteria: 완료 판단 기준
- test_cases_to_add: 추가할 테스트 문장 목록
"""

candidates_text = json.dumps(sorted_candidates, ensure_ascii=False, indent=2)

user_prompt = f"""
다음 개선 후보 목록을 우선순위가 높은 순서로 Backlog로 정리하세요.

개선 후보 목록:
{candidates_text}
"""

messages = [
    SystemMessage(content=system_prompt),
    HumanMessage(content=user_prompt),
]

response = llm.invoke(messages)

backlog_text = response.content

print(backlog_text)
