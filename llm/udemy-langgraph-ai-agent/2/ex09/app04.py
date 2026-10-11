from langchain_core.tools import tool

@tool
def fetch_order(order_id: str) -> dict:
    """주문 정보를 조회합니다."""
    return {
        "order_id": order_id,
        "status": "order",
        "amount": 19900,
        "item_name": "머그컵"
    }


@tool
def check_refund_eligibility(order_info: dict) -> dict:
    """주문 정보로 환불 가능 여부를 확인합니다."""
    refundable = order_info["status"] == "order"

    return {
        "order_id": order_info["order_id"],
        "refundable": refundable,
        "amount": order_info["amount"]
    }

@tool
def issue_refund(order_id: str, amount: int) -> str:
    """환불을 실행합니다."""
    return f"주문 {order_id}에 대해 {amount}원 환불이 완료되었습니다."

@tool
def compose_refund_message(refund_result: str) -> str:
    """환불 결과를 고객 안내 문장으로 만듭니다."""
    return f"고객 안내: {refund_result} 영업일 기준 3~5일 내 처리됩니다."


def run_refund_chain(order_id: str) -> str:
    order_info = fetch_order.invoke({"order_id": order_id})

    eligibility = check_refund_eligibility.invoke({"order_info": order_info})

    if not eligibility["refundable"]:
        return f"주문 {order_id}는 현재 환불 대상이 아닙니다."

    refund_result = issue_refund.invoke({
        "order_id": eligibility["order_id"],
        "amount": eligibility["amount"]
    })

    final_message = compose_refund_message.invoke({
        "refund_result": refund_result
    })

    return final_message

print(run_refund_chain("ORD-2025-0001"))
