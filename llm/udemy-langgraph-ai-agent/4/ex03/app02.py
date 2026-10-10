from langchain_openai import ChatOpenAI
from langchain_core.tools import tool
from langchain_core.messages import SystemMessage, HumanMessage, ToolMessage

@tool
def manage_inventory(sku: str) -> str:
    """재고 관리를 위한 tool을 정의합니다."""
    return f"{sku} 상품의 현재 재고와 안전 재고를 확인했습니다."


@tool
def forecast_demand(sku: str) -> str:
    """수요 예측을 위한 tool을 정의합니다."""
    return f"{sku} 상품의 다음 2주 수요 증가 가능성을 예측했습니다."


@tool
def send_logistics_response(message: str) -> str:
    """사용자에게 물류 처리 결과를 알려주는 공통 tool입니다."""
    return f"응답 전송 완료: {message}"

inventory_tools = [
    manage_inventory,
    forecast_demand,
    send_logistics_response,
]


llm = ChatOpenAI(model="gpt-5.4-mini",temperature=0)

inventory_llm = llm.bind_tools(inventory_tools)

tool_map = {
    "manage_inventory": manage_inventory,
    "forecast_demand": forecast_demand,
    "send_logistics_response": send_logistics_response,
}

system_message = SystemMessage(
    content=(
        "당신은 재고와 창고 운영을 담당하는 inventory agent입니다.\n"
        "사용자 요청을 분석한 뒤 필요한 tool을 호출하세요.\n"
        "재고 부족, 수요 예측, 발주 전략에 집중하세요.\n"
        "필요한 tool 실행이 모두 끝나면 최종 답변을 한국어로 자연스럽게 작성하세요."
    )
)

human_message = HumanMessage(
    content="SKU-12345 재고가 부족합니다. 다음 발주 전략을 검토하고 싶습니다."
)

messages = [
    system_message,
    human_message,
]

while True:
    response = inventory_llm.invoke(messages)
    messages.append(response)

    if not getattr(response, "tool_calls", None):
        print("==== 최종 응답 =====")
        print(response.content)
        break


    for tool_call in response.tool_calls:
        print("68:", tool_call)

        tool_name = tool_call["name"]
        tool_args = tool_call["args"]

        selected_tool = tool_map[tool_name]

        tool_result = selected_tool.invoke(tool_args)

        tool_message = ToolMessage(
            content=str(tool_result),
            tool_call_id=tool_call["id"],
        )

        messages.append(tool_message)


    print("------ while 루프 1회 완료--------")