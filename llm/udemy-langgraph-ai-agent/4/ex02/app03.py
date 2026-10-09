from langchain_openai import ChatOpenAI
from langchain_core.messages import SystemMessage, HumanMessage

llm = ChatOpenAI(model="gpt-5.4-mini", temperature=0)


# inventory agent가 사용할 수 있는 tool 이름 목록입니다.
inventory_tool_names = [
    "manage_inventory",
    "optimize_warehouse",
    "forecast_demand",
    "send_user_response",
]

# transportation agent가 사용할 수 있는 tool 이름 목록입니다.
transportation_tool_names = [
    "track_shipment",
    "arrange_shipping",
    "process_returns",
    "send_user_response",
]

# supplier agent가 사용할 수 있는 tool 이름 목록입니다.
supplier_tool_names = [
    "evaluate_supplier",
    "handle_compliance",
    "send_user_response",
]



# specialist agent용 system prompt를 만드는 함수입니다.
def create_specialist_prompt(agent_role: str, available_tools: list[str]) -> str:
    tool_text = ", ".join(available_tools)

    if agent_role == "inventory":
        role_description = "당신은 재고와 창고 운영을 담당하는 전문가입니다."

    elif agent_role == "transportation":
        role_description = "당신은 배송과 운송 문제를 담당하는 전문가입니다."

    elif agent_role == "supplier":
        role_description = "당신은 공급업체 평가와 규정 준수를 담당하는 전문가입니다."

    else:
        role_description = "당신은 물류 업무를 돕는 담당자입니다."

    return (
        f"{role_description}\n"
        f"사용 가능한 tool 목록: {tool_text}\n"
        "사용자 요청을 읽고, 가장 적절한 tool 이름과 짧은 이유를 한국어로 답하세요.\n"
        "실제로 처리했다고 과장하지 말고, 어떤 작업이 적절한지만 설명하세요."
    )


# specialist agent를 실행하는 함수입니다.
def run_specialist_agent(agent_role: str, available_tools: list[str], user_message: str) -> str:
    system_prompt = create_specialist_prompt(agent_role, available_tools)

    system_message = SystemMessage(content=system_prompt)

    human_message = HumanMessage(content=user_message)

    response = llm.invoke([system_message, human_message])

    return response.content





user_message = "SKU-12345 재고가 부족합니다. 다음 발주 전략을 검토하고 싶습니다."


inventory_answer = run_specialist_agent(
    agent_role="inventory",
    available_tools=inventory_tool_names,
    user_message=user_message,
)


# inventory agent의 답변을 출력합니다.
print("inventory agent 답변:")
print(inventory_answer)


transportation_answer = run_specialist_agent(
    agent_role="transportation",
    available_tools=transportation_tool_names,
    user_message=user_message,
)

print("\ntransportation agent 답변:")
print(transportation_answer)

