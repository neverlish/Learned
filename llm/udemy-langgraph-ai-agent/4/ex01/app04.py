from langchain_openai import ChatOpenAI
from langchain_core.tools import tool
from langchain_core.messages import SystemMessage, HumanMessage, ToolMessage

llm = ChatOpenAI(model="gpt-5.4-mini",    temperature=0)

# ------------------------------------------------------------
# 재고 관리 tool입니다.
# ------------------------------------------------------------
@tool
def manage_inventory(item_name: str) -> str:
    """상품 이름을 받아 재고를 확인하고 보충 전략을 준비합니다."""

    return f"{item_name} 재고를 확인하고 보충 전략을 준비했습니다."


# ------------------------------------------------------------
# 배송 추적 tool입니다.
# ------------------------------------------------------------
@tool
def track_shipment(order_id: str) -> str:
    """주문 번호를 받아 배송 상태를 조회합니다."""

    return f"{order_id} 주문의 배송 상태를 조회했습니다."


# ------------------------------------------------------------
# 공급업체 평가 tool입니다.
# ------------------------------------------------------------
@tool
def evaluate_supplier(supplier_name: str) -> str:
    """공급업체 이름을 받아 납기와 품질을 평가합니다."""

    return f"{supplier_name} 공급업체의 납기와 품질을 평가했습니다."


# ------------------------------------------------------------
# 비용 최적화 tool입니다.
# ------------------------------------------------------------
@tool
def optimize_cost(cost_area: str) -> str:
    """비용 영역을 받아 비용 절감 방안을 검토합니다."""

    return f"{cost_area} 영역의 비용 절감 방안을 검토했습니다."


tools = [
    manage_inventory,
    track_shipment,
    evaluate_supplier,
    optimize_cost,
]

llm_with_tools = llm.bind_tools(tools)

tool_map = {
    tool.name: tool
    for tool in tools
}

user_message = "요즘 배송비가 너무 많이 나와서 줄이고 싶어요."

system_message = SystemMessage(
    content=(
        "당신은 물류 업무 요청을 처리하는 도우미입니다.\n"
        "사용자의 요청을 읽고 필요한 경우 적절한 tool을 호출하세요.\n"
        "설명하지 말고 작업 결과만 보여주세요."
    )
)


human_message = HumanMessage(content=user_message)

first_response = llm_with_tools.invoke([
    system_message,
    human_message,
])

print("LLM의 tool_calls:", first_response.tool_calls)

tool_messages = []

if first_response.tool_calls:
    for tool_call in first_response.tool_calls:

        tool_name = tool_call["name"]

        tool_args = tool_call["args"]

        if tool_name not in tool_map:
            raise ValueError(f"알 수 없는 tool 이름입니다: {tool_name}")

        selected_tool = tool_map[tool_name]

        tool_result = selected_tool.invoke(tool_args)

        print("실행된 tool:", tool_name)
        print("tool 입력값:", tool_args)
        print("tool 실행 결과:", tool_result)

        tool_message = ToolMessage(
            content=tool_result,
            tool_call_id=tool_call["id"]
        )

        tool_messages.append(tool_message)



final_response = llm_with_tools.invoke([
    system_message,
    human_message,
    first_response,
    *tool_messages,
])

print("최종 답변:", final_response.content)
