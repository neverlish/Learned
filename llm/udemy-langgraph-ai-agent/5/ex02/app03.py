import time
import uuid
import json
from langchain_core.tools import tool
from langchain_openai import ChatOpenAI
from langchain_core.messages import HumanMessage
from langchain_core.messages import ToolMessage

@tool
def check_order_status(order_id: str) -> str:
    """주문 상태를 확인하는 Tool을 정의합니다."""
    return f"{order_id} 주문은 현재 배송 준비 중입니다."


tools = [check_order_status]
llm = ChatOpenAI(model="gpt-5.4-mini", temperature=0)
llm_with_tools = llm.bind_tools(tools)

class TraceRecorder:
    def __init__(self):
        self.trace_id = f"TRACE-{uuid.uuid4()}"
        self.spans = []

    def start_span(self, span_name: str) -> dict:
        span_id = f"SPAN-{uuid.uuid4()}"
        start_time = time.time()

        span = {
            "trace_id": self.trace_id,
            "span_id": span_id,
            "span_name": span_name,
            "start_time": start_time,
            "end_time": None,
            "duration_seconds": None,
            "status": "running",
            "attributes": {},
        }

        self.spans.append(span)
        return span

    def finish_span(self, span: dict, status: str = "success", attributes: dict | None = None) -> None:
        end_time = time.time()
        span["end_time"] = end_time
        span["duration_seconds"] = round(end_time - span["start_time"], 3)
        span["status"] = status
        if attributes:
            span["attributes"].update(attributes)

    def to_dict(self) -> dict:
        return {
            "trace_id": self.trace_id,
            "spans": self.spans,
        }

def run_agent_with_trace(user_message: str) -> dict:
    trace_recorder = TraceRecorder()

    receive_span = trace_recorder.start_span("receive_user_message")
    messages = [HumanMessage(content=user_message)]

    trace_recorder.finish_span(
        receive_span,
        attributes={"message_length": len(user_message)},
    )

    first_llm_span = trace_recorder.start_span("call_llm_for_tool_decision")

    first_response = llm_with_tools.invoke(messages)
    messages.append(first_response)

    trace_recorder.finish_span(
        first_llm_span,
        attributes={"model_name": "gpt-5.4-mini"},
    )

    tool_call_records = []

    if getattr(first_response, "tool_calls", None):
        for tool_call in first_response.tool_calls:
            tool_name = tool_call["name"]
            tool_args = tool_call["args"]

            tool_span = trace_recorder.start_span(f"execute_tool_{tool_name}")

            selected_tool = {"check_order_status": check_order_status}[tool_name]
            tool_result = selected_tool.invoke(tool_args)
            tool_message = ToolMessage(content=str(tool_result), tool_call_id=tool_call["id"])
            messages.append(tool_message)

            trace_recorder.finish_span(
                tool_span,
                attributes={
                    "tool_name": tool_name,
                    "tool_args": tool_args,
                },
            )

            tool_call_records.append({
                "tool_name": tool_name,
                "tool_args": tool_args,
                "tool_result": str(tool_result),
            })

    final_llm_span = trace_recorder.start_span("call_llm_for_final_answer")
    final_response = llm_with_tools.invoke(messages)

    trace_recorder.finish_span(
        final_llm_span,
        attributes={
            "model_name": "gpt-5.4-mini",
            "response_length": len(final_response.content),
        },
    )

    result = {
        "final_response": final_response.content,
        "tool_call_records": tool_call_records,
        "trace": trace_recorder.to_dict(),
    }

    return result



sample_message = "A1001 주문 상태를 확인해줘."

result = run_agent_with_trace(sample_message)

print(json.dumps(result, ensure_ascii=False, indent=2))
