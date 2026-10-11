from langchain_openai import ChatOpenAI
from langchain_core.messages import HumanMessage,AIMessage

llm = ChatOpenAI(model="gpt-5.4-mini", temperature=0)


conversation_history = []

conversation_history.append(
    HumanMessage(content="안녕하세요. 제 이름은 철수입니다.")
)

first_response = llm.invoke(conversation_history)

print("첫 번째 응답:")
print(first_response.content)

conversation_history.append(
    AIMessage(content=first_response.content)
)

conversation_history.append(
    HumanMessage(content="제 이름이 뭐였는지 말해줘.")
)

print("25:", conversation_history)
"""
[
HumanMessage(content='안녕하세요. 제 이름은 철수입니다.', additional_kwargs={}, response_metadata={}), 

AIMessage(content='안녕하세요, 철수님! 만나서 반갑습니다.  \n무엇을 도와드릴까요?', additional_kwargs={}, 
    response_metadata={}, tool_calls=[], invalid_tool_calls=[]),
     
HumanMessage(content='제 이름이 뭐였는지 말해줘.', additional_kwargs={}, response_metadata={})]

"""
second_response = llm.invoke(conversation_history)
print("\n두 번째 응답:")
print(second_response.content)
