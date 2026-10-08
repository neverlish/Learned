from concurrent.futures import ThreadPoolExecutor
from langchain_core.tools import tool
from langchain_openai import ChatOpenAI
from langchain_core.messages import HumanMessage

@tool
def get_customer_profile(customer_id: str) -> str:
    """고객 기본 정보를 조회합니다."""
    return f"고객 {customer_id} 이름은 홍길동입니다."

@tool
def get_order_history(customer_id: str) -> str:
    """고객 주문 이력을 조회합니다."""
    return f"고객 {customer_id}의 총 주문 수는 8회입니다."

@tool
def get_support_policy(customer_id: str) -> str:
    """고객에게 적용 가능한 지원 정책을 조회합니다."""
    return f"고객 {customer_id}는 우수 고객 우선 지원 대상입니다."

tools = [get_customer_profile, get_order_history, get_support_policy]

tool_map = {
    "get_customer_profile": get_customer_profile,
    "get_order_history": get_order_history,
    "get_support_policy": get_support_policy,
}

llm = ChatOpenAI(model="gpt-5.4-mini", temperature=0).bind_tools(tools)

messages = [HumanMessage("""
고객 CUST-1001 상태를 종합해서 요약해줘.
결과는 아래와 같은 json 형식으로 반환해줘.
-----------------------------------------
{
  "customer_id": "CUST-1001",
  "name": "홍길동",
  "order_summary": {
    "total_orders": 8
  },
  "support_policy": "우수 고객 우선 지원 대상",
  "status_summary": "홍길동 고객은 총 8회 주문 이력이 있으며, 우수 고객 우선 지원 대상입니다."
}
""")]
ai_msg = llm.invoke(messages)

messages.append(ai_msg)

def run_tool(tool_call: dict):
    selected_tool = tool_map[tool_call["name"]]
    print("39:", tool_call["name"])
    return selected_tool.invoke(tool_call)



with ThreadPoolExecutor(max_workers=len(ai_msg.tool_calls) or 1) as executor:
    tool_results = list(executor.map(run_tool, ai_msg.tool_calls))

messages.extend(tool_results)

final_response = llm.invoke(messages)

print(final_response.content)
