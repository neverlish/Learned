from langchain_openai import ChatOpenAI
from langchain_core.messages import HumanMessage, AIMessage

llm = ChatOpenAI(model="gpt-5.4-mini", temperature=0)


def get_recent_window(history, max_window):
    return history[-max_window:]

full_history = []
window_size = 4

full_history.append(
    HumanMessage(content="안녕하세요. 제 이름은 민지입니다. 전 중학생 이고 지금 15살입니다.")  #1
)

first_response = llm.invoke(get_recent_window(full_history, window_size))

print("첫 번째 응답:")
print(first_response.content)

full_history.append(
    AIMessage(content=first_response.content)   #2
)

full_history.append(
    HumanMessage(content="저는 파이썬 공부를 좋아해요.")  #3
)

middle_response_1 = llm.invoke(get_recent_window(full_history, window_size))
full_history.append(AIMessage(content=middle_response_1.content))

full_history.append(
    HumanMessage(content="그리고 플러터도 재미있어요.")  #4
)
middle_response_2 = llm.invoke(get_recent_window(full_history, window_size))
full_history.append(AIMessage(content=middle_response_2.content)) #5

full_history.append(
    HumanMessage(content="제 나이가 몇살이라 했는지 말해주세요.")
)

recent_messages = get_recent_window(full_history, window_size)
print("44:", len(full_history))

print("\n최근 창에 들어가는 메시지:")
for index, message in enumerate(recent_messages, start=1):
    print("48:", f"{index}. {message.type}: {message.content}")

final_response = llm.invoke(recent_messages)

print("\n마지막 응답:")
print(final_response.content)