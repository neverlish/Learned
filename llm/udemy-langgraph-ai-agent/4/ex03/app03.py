import operator
from typing import Annotated, Sequence, TypedDict
from langchain_openai import ChatOpenAI
from langchain_core.messages import BaseMessage, HumanMessage, SystemMessage
from langgraph.graph import StateGraph, END

llm = ChatOpenAI(model="gpt-5.4-mini", temperature=0)

class AgentState(TypedDict):
    operation: dict
    messages: Annotated[Sequence[BaseMessage], operator.add]


def supervisor_node(state: AgentState) -> dict:
    history = state["messages"]
    operation = state.get("operation", {})
    supervisor_prompt = (
        "당신은 물류 업무 팀의 supervisor입니다.\n"
        "사용자 요청을 읽고 담당 agent 하나만 선택하세요.\n"
        "inventory: 재고, 창고, 수요 예측, 발주 문제\n"
        "transportation: 배송, 운송, 반품, 지연 문제\n"
        "supplier: 공급업체, 납기, 계약, 규정 준수 문제\n"
        "반드시 inventory, transportation, supplier 중 하나만 답하세요.\n"
        "설명하지 마세요.\n"
        f"작업 정보: {operation}"
    )

    full_messages = [SystemMessage(content=supervisor_prompt)] + list(history)
    response = llm.invoke(full_messages)
    return {"messages": [response]}

# inventory node를 정의합니다.
def inventory_node(state: AgentState) -> dict:
    history = state["messages"]
    system_prompt = (
        "당신은 inventory agent입니다.\n"
        "재고, 창고, 수요 예측, 발주 전략을 담당합니다.\n"
        "사용자 요청에 대해 실행 계획을 짧고 명확하게 한국어로 답하세요."
    )
    full_messages = [SystemMessage(content=system_prompt)] + list(history)
    response = llm.invoke(full_messages)

    return {"messages": [response]}

# transportation node를 정의합니다.
def transportation_node(state: AgentState) -> dict:
    history = state["messages"]
    system_prompt = (
        "당신은 transportation agent입니다.\n"
        "배송, 운송, 반품, 지연 문제를 담당합니다.\n"
        "사용자 요청에 대해 실행 계획을 짧고 명확하게 한국어로 답하세요."
    )

    full_messages = [SystemMessage(content=system_prompt)] + list(history)
    response = llm.invoke(full_messages)
    return {"messages": [response]}


# supplier node를 정의합니다.
def supplier_node(state: AgentState) -> dict:
    history = state["messages"]

    system_prompt = (
        "당신은 supplier agent입니다.\n"
        "공급업체 평가, 납기, 계약, 규정 준수를 담당합니다.\n"
        "사용자 요청에 대해 실행 계획을 짧고 명확하게 한국어로 답하세요."
    )

    full_messages = [SystemMessage(content=system_prompt)] + list(history)
    response = llm.invoke(full_messages)
    return {"messages": [response]}


# supervisor의 결과를 보고 어느 specialist node로 갈지 정하는 함수입니다.
def route_to_specialist(state: AgentState) -> str:
    last_message = state["messages"][-1]
    agent_name = last_message.content.strip().lower()

    if agent_name == "inventory":
        return "inventory"

    if agent_name == "transportation":
        return "transportation"

    if agent_name == "supplier":
        return "supplier"

    return END


def construct_graph():
    graph_builder = StateGraph(AgentState)

    graph_builder.add_node("supervisor", supervisor_node) # 노드명 , 함수명

    graph_builder.add_node("inventory", inventory_node)
    graph_builder.add_node("transportation", transportation_node)
    graph_builder.add_node("supplier", supplier_node)



    graph_builder.set_entry_point("supervisor")

    graph_builder.add_conditional_edges(
        "supervisor",
        route_to_specialist,
        {
            "inventory": "inventory", # 함수반환 문자열 : 노드명
            "transportation": "transportation",
            "supplier": "supplier",
        },
    )

    graph_builder.add_edge("inventory", END)
    graph_builder.add_edge("transportation", END)
    graph_builder.add_edge("supplier", END)

    return graph_builder.compile()



graph = construct_graph()

operation = {
    "operation_id": "OP-12345",
    "priority": "high",
    "location": "Warehouse A",
}

user_message = HumanMessage(
    content="SKU-12345 재고가 부족합니다. 다음 발주 전략을 알려주세요."
)


result = graph.invoke(
    {
        "operation": operation,
        "messages": [user_message],
    }
)

cnt = 0
for message in result["messages"]:
    print(f"{cnt+1}.{message.type}: {message.content}")
    cnt += 1
