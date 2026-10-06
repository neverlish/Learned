from langchain_openai import ChatOpenAI

from langchain_core.messages import HumanMessage

from langchain_core.tools import tool

@tool
def add_numbers(x: int, y: int) -> int:
    """두 개의 숫자를 더한 후 합을 반환합니다."""
    return x + y

llm = ChatOpenAI(model="gpt-5.4-mini")

llm_with_tools = llm.bind_tools([add_numbers])

messages = [HumanMessage(content="12 + 30은 무엇인가요?")]

ai_msg = llm_with_tools.invoke(messages)

for tool_call in ai_msg.tool_calls:
    print(tool_call)

    tool_response = add_numbers.invoke(tool_call)
    print(tool_response)
    print(tool_response.name)
    print(tool_response.content)