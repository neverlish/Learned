import time
import json
from langchain_core.tools import tool
from langchain_openai import ChatOpenAI
from langchain_core.messages import HumanMessage
from langchain_core.messages import ToolMessage

@tool
def check_order_status(order_id: str) -> str:
    """주문 상태를 확인하는 Tool을 정의합니다."""
    return f"{order_id} 주문은 현재 배송 준비 중입니다."

def run_tool_agent(user_message: str) -> dict:
    start_time = time.time()

    messages = [HumanMessage(content=user_message)]
    tool_call_records = []

    first_response = llm_with_tools.invoke(messages)
    messages.append(first_response)

    if getattr(first_response, "tool_calls", None):
        for tool_call in first_response.tool_calls:
            tool_name = tool_call["name"]
            tool_args = tool_call["args"]
            selected_tool = {
                "check_order_status": check_order_status
            }[tool_name]

            tool_result = selected_tool.invoke(tool_args)
            tool_message = ToolMessage(
                content=str(tool_result),
                tool_call_id=tool_call["id"]
            )
            messages.append(tool_message)

            tool_call_records.append({
                "tool_name": tool_name,
                "tool_args": tool_args,
                "tool_result": str(tool_result),
            })

    final_response = llm_with_tools.invoke(messages)
    end_time = time.time()
    elapsed_seconds = round(end_time - start_time, 3)

    monitoring_record = {
        "user_message": user_message,
        "final_response": final_response.content,
        "has_tool_calls": len(tool_call_records) > 0,
        "tool_call_records": tool_call_records,
        "elapsed_seconds": elapsed_seconds,
    }

    return monitoring_record


tools = [check_order_status]
llm = ChatOpenAI(model="gpt-5.4-mini", temperature=0)
llm_with_tools = llm.bind_tools(tools)

sample_message = "A1001 주문 상태를 확인해줘."
result_record = run_tool_agent(sample_message)

print(json.dumps(result_record, ensure_ascii=False, indent=2))