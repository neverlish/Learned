# ------------------------------------------------------------
# 작업 후에 결과를 한 번 더 점검
# Reflection
# ------------------------------------------------------------

def execute_task(order_id: str) -> str:
    return f"주문 {order_id} 취소 요청이 접수되었습니다."


def check_result(result_text: str) -> str:
    if "취소 요청" in result_text:
        return "점검 결과: 핵심 처리 문구가 포함되어 있습니다. 결과가 정상으로 보입니다."
    return "점검 결과: 핵심 처리 문구가 없습니다. 재확인이 필요합니다."


def reflection_agent(order_id: str) -> str:
    result = execute_task(order_id)

    review_result = check_result(result)

    return result + "\n" + review_result


print(reflection_agent("A12345"))