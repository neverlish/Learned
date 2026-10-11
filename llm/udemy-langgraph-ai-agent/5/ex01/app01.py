import time
import json
from langchain_openai import ChatOpenAI
from langchain_core.messages import HumanMessage

llm = ChatOpenAI(model="gpt-5.4-mini", temperature=0)

def run_basic_agent(user_message: str) -> dict:
    start_time = time.time()
    is_success = False
    error_message = None
    assistant_text = ""

    try:
        messages = [HumanMessage(content=user_message)]
        response = llm.invoke(messages)
        assistant_text = response.content
        is_success = True
    except Exception as error:
        error_message = str(error)

    end_time = time.time()
    elapsed_seconds = round(end_time - start_time, 3)

    monitoring_record = {
        "user_message": user_message,
        "assistant_text": assistant_text,
        "is_success": is_success,
        "elapsed_seconds": elapsed_seconds,
        "error_message": error_message,
    }

    return monitoring_record

sample_message = "AI Agent 운영에서 모니터링이 왜 필요한지 한 문단으로 설명해줘."
result_record = run_basic_agent(sample_message)

print(json.dumps(result_record, ensure_ascii=False, indent=2))