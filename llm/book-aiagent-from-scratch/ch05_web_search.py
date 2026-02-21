import asyncio
from openai import AsyncOpenAI

async_client = AsyncOpenAI()

async def llm_search_async(prompt: str, model: str = "gpt-4.1") -> str:
    response = await async_client.responses.create(
        model=model,
        input=prompt,
        tools=[{"type": "web_search_preview"}]
    )
    return response.output_text

async def main():
    prompt = "오늘의 흥미로운 뉴스를 찾아줘."
    result = await llm_search_async(prompt)
    print("\n💡 웹 검색 결과:")
    print(result)

if __name__ == "__main__":
    asyncio.run(main())