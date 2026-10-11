import time
from datetime import datetime
import uuid
import json
import re
from langchain_openai import ChatOpenAI
from langchain_core.messages import HumanMessage
import re

llm = ChatOpenAI(model="gpt-5.4-mini", temperature=0)


def mask_sensitive_text(text: str) -> str:
    email_pattern = r"[\w\.-]+@[\w\.-]+\.\w+"
    masked_text = re.sub(email_pattern, "[EMAIL_MASKED]", text)

    phone_pattern = r"(01[016789]-?\d{3,4}-?)(\d{4})"
    masked_text = re.sub(phone_pattern, r"\1****", masked_text)

    rrn_pattern = r"(\d{6}-?\d)(\d{6})"
    masked_text = re.sub(rrn_pattern, r"\1******", masked_text)
    return masked_text

def create_log_event(event_name: str, payload: dict) -> dict:
    timestamp = datetime.now().isoformat()

    log_event = {
        "timestamp": timestamp,
        "event_name": event_name,
        "payload": payload,
    }
    return log_event


def run_agent_with_log(user_message: str) -> dict:
    request_id = f"REQ-{uuid.uuid4()}"
    start_time = time.time()

    masked_user_message = mask_sensitive_text(user_message)

    start_log = create_log_event(
        "agent_run_started",
        {
            "request_id": request_id,
            "user_message": masked_user_message,
        },
    )

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

    end_log = create_log_event(
        "agent_run_completed",
        {
            "request_id": request_id,
            "status": "success" if is_success else "failure",
            "latency_seconds": latency_seconds,
            "response_preview": response_text[:120],
            "error_message": error_message,
        },
    )

    result = {
        "request_id": request_id,
        "response_text": response_text,
        "logs": [start_log, end_log],
    }

    return result





sample_message = ("제 이메일은 student@example.com 입니다. "
                  "전화번호는 010-1234-1234 주민등록번호는 123456-3123456 입니다. "
                  "AI Agent 로그를 왜 남겨야 하나요?")

result = run_agent_with_log(sample_message)

print(json.dumps(result, ensure_ascii=False, indent=2))