from langchain_openai import ChatOpenAI
from langchain_core.messages import HumanMessage

llm = ChatOpenAI(model="gpt-5.4-mini", temperature=0)

first_messages = [
    HumanMessage(content="안녕하세요. 제 이름은 철수입니다.")
]

first_response = llm.invoke(first_messages)

print("첫 번째 응답:")
print(first_response.content)

second_messages = [
    HumanMessage(content="제 이름이 뭐였는지 말해줘.")
]

second_response = llm.invoke(second_messages)
print("\n두 번째 응답:")
print(second_response.content)
