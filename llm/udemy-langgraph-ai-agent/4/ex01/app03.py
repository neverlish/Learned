from langchain_openai import ChatOpenAI
from langchain_core.messages import HumanMessage, SystemMessage

llm = ChatOpenAI(model="gpt-5.4-mini", temperature=0)

def manage_inventory(item_name: str) -> str:
    return f"{item_name} 재고를 확인하고 보충 전략을 준비했습니다."

def track_shipment(order_id: str) -> str:
    return f"{order_id} 주문의 배송 상태를 조회했습니다."

def evaluate_supplier(supplier_name: str) -> str:
    return f"{supplier_name} 공급업체의 납기와 품질을 평가했습니다."

def optimize_cost(cost_area: str) -> str:
    return f"{cost_area} 영역의 비용 절감 방안을 검토했습니다."

tool_map = {
    "재고 관리": manage_inventory,
    "배송 추적": track_shipment,
    "공급업체 평가": evaluate_supplier,
    "비용 최적화": optimize_cost,
}


def route_request(user_message: str) -> str:
    system_message = SystemMessage(
        content=(
            "당신은 물류 업무 요청을 분류하는 담당자입니다.\n"
            "사용자 요청을 읽고 다음 작업명 중 하나만 정확히 고르세요.\n"
            "가능한 작업명: 재고 관리, 배송 추적, 공급업체 평가, 비용 최적화\n"
            "설명하지 말고 작업명만 답하세요."
        )
    )

    human_message = HumanMessage(content=user_message)

    model_response = llm.invoke([system_message, human_message])

    selected_tool_name = model_response.content.strip()

    return selected_tool_name


user_message = "요즘 배송비가 너무 많이 나와서 줄이고 싶어요."

selected_tool_name = route_request(user_message)

print("LLM이 선택한 tool:", selected_tool_name)


if selected_tool_name not in tool_map:
    raise ValueError(f"알 수 없는 tool 이름입니다: {selected_tool_name}")

selected_tool = tool_map[selected_tool_name]

tool_result = selected_tool("배송비")

print("tool 실행 결과:", tool_result)



final_system_message = SystemMessage(
    content=(
        "당신은 친절한 물류 업무 도우미입니다.\n"
        "tool 실행 결과를 바탕으로 사용자에게 짧고 자연스럽게 답하세요.\n"
        "과장하지 말고, 실행된 내용만 말하세요."
    )
)


final_human_message = HumanMessage(
    content=(
        f"사용자 요청: {user_message}\n"
        f"실행 결과: {tool_result}"
    )
)

final_response = llm.invoke([final_system_message, final_human_message])

print("최종 답변:", final_response.content)
