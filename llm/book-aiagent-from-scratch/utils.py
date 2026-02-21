from openai import OpenAI

sync_client = OpenAI()

def llm_call(prompt: str, model: str = "gpt-4o-mini") -> str:
    messages = []
    messages.append({"role": "user", "content": prompt})

    chat_completion = sync_client.chat.completions.create(
        model=model,
        messages=messages,
    )
    return chat_completion.choices[0].message.content

if __name__ == "__main__":
    test = llm_call("한국의 수도는?")
    print(test)