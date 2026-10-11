import asyncio
import uuid
from langchain_openai import ChatOpenAI
from langchain_core.messages import SystemMessage, HumanMessage

llm = ChatOpenAI(model="gpt-5.4-mini", temperature=0)

agent_queues = {
    "inventory": asyncio.Queue(),
    "transportation": asyncio.Queue(),
    "supplier": asyncio.Queue(),
}

valid_agents = ["inventory", "transportation", "supplier"]


async def consume_task(agent_name: str):
    queue = agent_queues[agent_name]
    while True:
        task = await queue.get()
        try:
            user_message = task["user_message"]
            task_id = task["task_id"]
            print(f"{agent_name} agent가 작업을 처리했습니다.")
            print(f"task_id: {task_id}")
            print(f"user_message: {user_message}")
        finally:
            queue.task_done()


async def choose_target_agent(user_message: str) -> str:
    system_message = SystemMessage(
        content=(
            "당신은 물류 업무 supervisor입니다.\n"
            "사용자 요청을 읽고 담당 agent 하나만 선택하세요.\n"
            "가능한 선택: inventory, transportation, supplier\n"
            "inventory: 재고, 창고, 수요 예측, 발주 문제\n"
            "transportation: 배송, 운송, 반품, 지연 문제\n"
            "supplier: 공급업체, 납기, 계약, 규정 준수 문제\n"
            "설명하지 말고 선택지만 답하세요."
        )
    )

    human_message = HumanMessage(content=user_message)
    response = llm.invoke([system_message, human_message])
    target_agent = response.content.strip().lower()

    if target_agent not in valid_agents:
        return "inventory"
    return target_agent

async def publish_task(user_message: str) -> tuple[str, str]:
    target_agent = await choose_target_agent(user_message)
    task_id = str(uuid.uuid4())
    task = {
        "task_id": task_id,
        "target_agent": target_agent,
        "user_message": user_message,
    }

    target_queue = agent_queues[target_agent]

    await target_queue.put(task)

    print(f"published task: {task_id} -> {target_agent}")

    return task_id, target_agent


async def main():
    workers = [
        asyncio.create_task(consume_task("inventory")),
        asyncio.create_task(consume_task("transportation")),
        asyncio.create_task(consume_task("supplier")),
    ]

    user_message = "서울 지역 배송이 계속 지연되고 있습니다. 원인을 확인하고 싶습니다."
    task_id, target_agent = await publish_task(user_message)
    target_queue = agent_queues[target_agent]

    await target_queue.join()

    for worker in workers:
        worker.cancel()

    await asyncio.gather(*workers, return_exceptions=True)
    print("모든 작업 처리가 끝났습니다.")

asyncio.run(main())
