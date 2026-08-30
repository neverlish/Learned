from typing import TypedDict, Annotated, Sequence
import operator
from langchain.tools import tool
from langchain.chat_models import init_chat_model
from langchain_core.messages import BaseMessage, SystemMessage, HumanMessage, ToolMessage
from langgraph.graph import StateGraph

import os
try:
    from dotenv import load_dotenv
    load_dotenv()
except ImportError:
    pass

if not os.getenv("OPENAI_API_KEY"):
    raise ValueError(
        "OPENAI_API_KEY가 설정되지 않았습니다."
        "환경변수 또는 .env 파일에서 설정해주세요."
    )

class AgentState(TypedDict):
    order: dict
    messages: Annotated[Sequence[BaseMessage], operator.add]

@tool
def cancel_order(order_id: str) -> str:
    """배송되지 않은 주문을 취소합니다."""
    return f"주문 {order_id}이(가) 취소되었습니다."

def call_model(state):
    msgs = state["messages"]
    order = state.get("order", {"order_id": "UNKNOWN"})

    llm = init_chat_model(model="gpt-5-mini", temperature=0)
    llm_with_tools = llm.bind_tools([cancel_order])

    prompt = (
        f'''당신은 이커머스 지원 에이전트입니다.
        주문 ID: {order['order_id']}
        고객이 취소를 요청하면 cancel_order(order_id)를 호출하고
        간단한 확인 메시지를 보내세요.
        그렇지 않으면 일반적으로 응답하세요.'''
    )
    full = [SystemMessage(content=prompt)] + msgs

    first = llm_with_tools.invoke(full)
    out = [first]

    if getattr(first, "tool_calls", None):
        tc = first.tool_calls[0]
        result = cancel_order.invoke(tc["args"])
        out.append(ToolMessage(content=result, tool_call_id=tc["id"]))

        second = llm_with_tools.invoke(full + out)
        out.append(second)

    return {"messages": out}

def construct_graph():
    g = StateGraph(AgentState)
    g.add_node("assistant", call_model)
    g.set_entry_point("assistant")
    return g.compile()

graph = construct_graph()

if __name__ == "__main__":
    example_order = {"order_id": "B73973"}
    convo = [HumanMessage(content="주문 #B73973를 취소해주세요.")]
    result = graph.invoke({"order": example_order, "messages": convo})
    for msg in result["messages"]:
        print(f"{msg.type}: {msg.content}")
