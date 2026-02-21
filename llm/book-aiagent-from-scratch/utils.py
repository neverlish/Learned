from openai import AsyncOpenAI, OpenAI

sync_client = OpenAI()

def llm_call(prompt: str, model: str = "gpt-4o-mini") -> str:
    messages = []
    messages.append({"role": "user", "content": prompt})

    chat_completion = sync_client.chat.completions.create(
        model=model,
        messages=messages,
    )
    return chat_completion.choices[0].message.content

async_client = AsyncOpenAI()

async def llm_call_async(prompt: str, model: str = "gpt-4o-mini") -> str:
    messages = []
    messages.append({"role": "user", "content": prompt})
    chat_completion = await async_client.chat.completions.create(
        model=model,
        messages=messages,
    )
    print(model,"완료")

    return chat_completion.choices[0].message.content

async def llm_search_async(prompt: str, model: str = "gpt-4.1") -> str:
    response = await async_client.responses.create(
        model = model,
        input = prompt,
        tools = [{"type": "web_search_preview"}],
    )
    return response.output_text

if __name__ == "__main__":
    test = llm_call("한국의 수도는?")
    print(test)