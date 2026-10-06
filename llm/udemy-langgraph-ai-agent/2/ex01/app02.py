from langchain_openai import ChatOpenAI
from langchain_core.messages import HumanMessage
from langchain_core.tools import tool

@tool
def add(x: float, y: float) -> float:
    """'x'와 'y'를 더합니다."""
    return x + y

@tool
def multiply(x: float, y: float) -> float:
    """x 와 y 를 곱합니다."""
    return x * y

tools = [add, multiply]

llm = ChatOpenAI(model_name="gpt-5.4-mini", temperature=0)

llm_with_tools = llm.bind_tools(tools)

# query = "393.12 * 10는 무엇인가요? 그리고 11 + 49는 무엇인가요?"
query = "393.12 * 10는 무엇인가요? 그리고 결과에 10을 더하면 ?"
messages = [HumanMessage(query)]

ai_msg = llm_with_tools.invoke(messages)

messages.append(ai_msg)

print("28:", ai_msg)

for tool_call in ai_msg.tool_calls:
    selected_tool = {
        "add": add,
        "multiply": multiply
    }[tool_call["name"].lower()]

    tool_msg = selected_tool.invoke(tool_call)

    print(f"도구 이름: {tool_msg.name}")
    print(f"전달 인자: {tool_call['args']}")
    print(f"실행 결과: {tool_msg.content}")

    messages.append(tool_msg)


print("45:", messages)

final_response = llm_with_tools.invoke(messages)

print("최종 응답:\n", final_response.content)

