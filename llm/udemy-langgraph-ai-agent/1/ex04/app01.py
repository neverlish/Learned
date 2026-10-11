import os

from typing import TypedDict, List, Dict, Any
from dotenv import load_dotenv
from langchain.tools import tool
from langchain_openai.chat_models import ChatOpenAI
from langchain_core.messages import (
    BaseMessage,
    SystemMessage,
    HumanMessage,
    ToolMessage
)
from langgraph.graph import StateGraph

load_dotenv()

if not os.getenv("OPENAI_API_KEY"):
    raise ValueError(
        "OPENAI_API_KEY environment variable is not set. " \
        "Please set it in your environment or in a .env file."
    )

class AgentState(TypedDict):
    order: Dict[str, Any]
    messages: List[BaseMessage]

@tool
def cancel_order(order_id: str) -> str :
    """아직 배송되지 않은 주문을 취소합니다."""
    return f"주문 {order_id}가 취소되었습니다."


def call_model(state: AgentState) -> Dict[str, List[BaseMessage]]:
    msgs = state["messages"]

    order = state.get("order", {"order_id": "UNKNOWN"})

    prompt = f"""
너는 쇼핑몰 고객지원 도우미다.
주문 번호는 {order["order_id"]} 이다.
고객이 주문 취소를 요청하면 cancel_order(order_id)를 호출한 뒤
간단한 확인 메세지를 보내라.
그 외의 경우에는 일반 답변만 하라.
    """.strip()

    full_messages = [SystemMessage(content=prompt)] + msgs

    llm = ChatOpenAI(
        model_name="gpt-5",
        temperature=0,
    ).bind_tools([cancel_order])

    first = llm.invoke(full_messages)

    messages_out: List[BaseMessage] = [first]

    if getattr(first, "tool_calls", None):
        tool_call = first.tool_calls[0]

        tool_result = cancel_order.invoke(tool_call["args"])

        messages_out.append(
            ToolMessage(
                content=str(tool_result),
                tool_call_id=tool_call["id"]
            )
        )

        second = llm.invoke(full_messages + messages_out)

        messages_out.append(second)

    return {"messages": messages_out}

def construct_graph():
    graph_builder = StateGraph(AgentState)

    graph_builder.add_node("assistant", call_model)
    
    graph_builder.set_entry_point("assistant")

    return graph_builder.compile()

graph = construct_graph()

conversation = [
    HumanMessage(content="제 주문 A12345를 취소해 주세요.")
]

example_order = {"order_id": "A12345"}

result = graph.invoke(
    {
        "order": example_order,
        "messages": conversation
    }
)

print("===== 실행 결과 =====")

for message in result["messages"]:
    print(f"{message.type}: {message.content}")
