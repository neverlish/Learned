import time
import json
from statistics import mean
from langchain_openai import ChatOpenAI
from langchain_core.messages import HumanMessage

llm = ChatOpenAI(model="gpt-5.4-mini", temperature=0)


def run_agent_once(user_message: str) -> dict:
    start_time = time.time()
    is_success = False
    error_message = None
    response_text = ""

    try:
        messages = [HumanMessage(content=user_message)]
        response = llm.invoke(messages)

        response_text = response.content
        is_success = True
    except Exception as error:
        error_message = str(error)

    end_time = time.time()
    latency_seconds = round(end_time - start_time, 3)

    run_record = {
        "user_message": user_message,
        "response_text": response_text,
        "is_success": is_success,
        "latency_seconds": latency_seconds,
        "error_message": error_message,
        "tool_call_count": 0,
    }

    return run_record

def collect_metrics(records: list[dict]) -> dict:
    total_requests = len(records)
    success_count = sum(1 for record in records if record["is_success"])

    failure_count = total_requests - success_count

    latency_values = [record["latency_seconds"] for record in records]
    average_latency = round(mean(latency_values), 3) if latency_values else 0

    tool_call_count = sum(record["tool_call_count"] for record in records)
    success_rate = round(success_count / total_requests, 3) if total_requests else 0

    metrics = {
        "total_requests": total_requests,
        "success_count": success_count,
        "failure_count": failure_count,
        "success_rate": success_rate,
        "average_latency": average_latency,
        "tool_call_count": tool_call_count,
    }

    return metrics



sample_messages = [
    "AI Agent 모니터링이 왜 필요한지 짧게 설명해줘.",
    "운영 환경에서 응답 시간이 중요한 이유를 알려줘.",
    "Tool Call 기록을 남겨야 하는 이유를 설명해줘.",
]

run_records = [run_agent_once(message) for message in sample_messages]

metrics = collect_metrics(run_records)

print("=== 실행 기록 ===")
print(json.dumps(run_records, ensure_ascii=False, indent=2))

print("\n=== 측정 지표 ===")
print(json.dumps(metrics, ensure_ascii=False, indent=2))
