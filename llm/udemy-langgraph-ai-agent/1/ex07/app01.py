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

import time

@tool
def cancel_order(order_id: str) -> str :
    """아직 배송되지 않은 주문을 취소합니다."""
    return f"주문 {order_id}가 취소되었습니다."

class AgentState(TypedDict):
    order: Dict[str, Any]
    messages: List[BaseMessage]

def call_model(state):
    messages = state["messages"]

    order = state.get(
        "order",
        {
            "order_id": "UNKNOWN",
            "status": "UNKNOWN"
        }
    )

    order_id = order["order_id"]
    order_status = order["status"]

    system_prompt = f"""
    너는 쇼핑몰 고객지원 도우미다.
    현재 주문 번호는 {order_id} 이다.
    현재 상태는 {order_status} 이다.

    규칙:
    1. 고객이 주문 취소를 요청했다면 주문 상태를 먼저 확인하라.
    2. 주문 상태가 '주문'이면 cancel_order(order_id)를 호출하라.
    3. 주문 상태가 '배송중'이면 취소가 어렵다고 안내하라.
    4. 항상 짧고 분명하게 설명하라.
    """

    full_messages = [SystemMessage(content=system_prompt)] + messages

    llm = ChatOpenAI(model="gpt-5.4-nano", temperature=0).bind_tools([cancel_order])

    first_response = llm.invoke(full_messages)

    output_messages = [first_response]

    if getattr(first_response, "tool_calls", None):
        tool_call = first_response.tool_calls[0]

        tool_name = tool_call["name"]

        selected_tool = globals().get(tool_name)

        if selected_tool is None:
            raise ValueError(f"도구를 찾을 수 없습니다: {tool_name}")

        tool_result = selected_tool.invoke(tool_call["args"])
        output_messages.append(
            ToolMessage(
                content=tool_result, 
                tool_call_id=tool_call["id"]
            )
        )

        second_response = llm.invoke(full_messages + output_messages)
        output_messages.append(second_response)

    return {"messages": output_messages}

def construct_graph():
    graph_builder = StateGraph(AgentState)

    graph_builder.add_node("assistant", call_model)
    
    graph_builder.set_entry_point("assistant")

    return graph_builder.compile()

def run_case(order, user_text):
    conversation = [
        HumanMessage(content=user_text),
    ]

    result = graph.invoke(
        {
            "order": order,
            "messages": conversation
        }
    )

    return result

def extract_simple_signals(result):
    messages = result["messages"]

    tool_called = False
    called_order_id = None
    final_text = ""

    first_message = messages[0]

    if getattr(first_message, "tool_calls", None):
        tool_called = True
        
        called_order_id = first_message.tool_calls[0]["args"].get("order_id")

    final_text = str(messages[-1].content)

    return {
        "tool_called": tool_called,
        "called_order_id": called_order_id,
        "final_text": final_text
    }

graph = construct_graph()

order_1 = {
    "order_id": "A1001",
    "status": "주문"
}

pending_result = run_case(order_1, "제 주문 A1001을 취소해 주세요.")

pending_signals = extract_simple_signals(pending_result)

print(pending_signals)

print('==== 1 번째 테스트 ====')
assert pending_signals["tool_called"] is True, "취소 도구가 호출되지 않았습니다."

print('==== 2 번째 테스트 ====')
assert pending_signals["called_order_id"] == "A1001", "주문 번호가 잘못 전달되었습니다."

print('==== 3 번째 테스트 ====')
assert "취소" in pending_signals["final_text"], "최종 안내 문구에 취소 관련 표현이 없습니다."

print('==== 배송 전 주문 테스트 =====')
for message in pending_result["messages"]:
    print(f"{message.type}: {message.content}")

s = time.time()


order_2 = {
    "order_id": "B2002",
    "status": "배송중"
}

shipped_result = run_case(order_2, "제 주문 B2002를 취소해 주세요.")

shipped_signals = extract_simple_signals(shipped_result)

print(shipped_signals)

print('==== 1 번째 테스트 ====')
assert shipped_signals["tool_called"] is False, "배송 중 주문인데 취소 도구가 호출되었습니다."

print('==== 2 번째 테스트 ====')
# assert shipped_signals["called_order_id"] == "B2002", "주문 번호가 잘못 전달되었습니다."

print('==== 3 번째 테스트 ====')
assert (
    "어렵" in shipped_signals["final_text"] 
    or "불가" in shipped_signals["final_text"]
    or "배송" in shipped_signals["final_text"]
), "배송 중 주문에 대한 안내 문구가 충분하지 않습니다."

print('==== 배송 중 주문 테스트 =====')
for message in shipped_result["messages"]:
    print(f"{message.type}: {message.content}")

e = time.time()

print(e-s)