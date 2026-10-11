from langchain_openai import ChatOpenAI
from langchain_core.messages import SystemMessage, HumanMessage

llm = ChatOpenAI(model="gpt-5.4-mini", temperature=0)

valid_agents = ["inventory", "transportation", "supplier"]

def route_to_agent(user_message: str) -> str:

    supervisor_prompt = (
        "당신은 물류 업무 팀의 supervisor입니다.\n"
        "사용자 요청을 읽고 다음 세 agent 중 하나만 선택하세요.\n"
        "inventory: 재고, 창고, 수요 예측, 발주 문제\n"
        "transportation: 배송, 운송, 반품, 지연 문제\n"
        "supplier: 공급업체, 납기, 계약, 규정 준수 문제\n"
        "반드시 inventory, transportation, supplier 중 하나만 답하세요.\n"
        "설명하지 마세요."
    )

    system_message = SystemMessage(content=supervisor_prompt)
    human_message = HumanMessage(content=user_message)

    response = llm.invoke([system_message, human_message])

    selected_agent = response.content.strip().lower()

    if selected_agent not in valid_agents:
        raise ValueError(f"알 수 없는 agent 이름입니다: {selected_agent}")

    return selected_agent


user_message = "서울 지역 배송이 계속 지연되고 있습니다. 원인을 확인하고 싶습니다."
selected_agent = route_to_agent(user_message)

print("선택된 agent:", selected_agent)