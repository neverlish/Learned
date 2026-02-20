from openai import OpenAI

message_history = []

while True:
    user_input = input("사용자: ")
    message_history.append({"role": "user", "content": user_input})
    chat_completion = OpenAI().chat.completions.create(
        messages=message_history,
        model="gpt-4o"
    )
    assistant_response = chat_completion.choices[0].message.content
    message_history.append({"role": "assistant", "content": assistant_response})
    print(f"챗봇: {assistant_response}")
