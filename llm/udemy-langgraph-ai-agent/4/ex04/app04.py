import asyncio
import uuid
import time
from langchain_openai import ChatOpenAI
from langchain_core.messages import SystemMessage, HumanMessage


llm = ChatOpenAI(model="gpt-5.4-mini", temperature=0)

agent_queues = {
    "inventory": asyncio.Queue(),
    "transportation": asyncio.Queue(),
    "supplier": asyncio.Queue(),
}

valid_agents = ["inventory", "transportation", "supplier"]

def now_text(start_time: float) -> str:
    elapsed = time.perf_counter() - start_time
    return f"{elapsed:5.2f}s"


async def consume_task(agent_name: str, start_time: float):
    queue = agent_queues[agent_name]
    while True:
        task = await queue.get()
        try:
            task_id = task["task_id"]
            user_message = task["user_message"]
            print(f"[{now_text(start_time)}] {agent_name} agent 작업 시작")
            print(f"                 task_id: {task_id}")
            print(f"                 질문: {user_message}")

            await asyncio.sleep(5)
            print(f"[{now_text(start_time)}] 질문-답변:{user_message} \n {agent_name} agent 작업 완료!\n task_id: {task_id}\n")
        finally:
            queue.task_done()


async def choose_target_agent(user_message: str) -> str:
    system_message = SystemMessage(
        content=(
            "당신은 물류 업무 supervisor입니다.\n"
            "사용자 질문을 읽고 담당 agent 하나만 선택하세요.\n"
            "가능한 선택: inventory, transportation, supplier\n"
            "inventory: 창고, 재고, 수요 예측, 발주 문제\n"
            "transportation: 배송, 운송, 반품, 지연 문제\n"
            "supplier: 거래처, 공급업체, 납기, 계약, 규정 준수 문제\n"
            "설명하지 말고 선택지만 답하세요."
        )
    )
    human_message = HumanMessage(content=user_message)
    response = await llm.ainvoke([system_message, human_message])
    target_agent = response.content.strip().lower()
    if target_agent not in valid_agents:
        if "창고" in user_message or "재고" in user_message or "발주" in user_message:
            return "inventory"

        if "배송" in user_message or "운송" in user_message or "지연" in user_message or "반품" in user_message:
            return "transportation"

        if "거래처" in user_message or "공급업체" in user_message or "납기" in user_message or "계약" in user_message:
            return "supplier"

        return "inventory"

    return target_agent

async def publish_task(user_message: str, start_time: float) -> tuple[str, str]:
    target_agent = await choose_target_agent(user_message)
    task_id = str(uuid.uuid4())

    task = {
        "task_id": task_id,
        "target_agent": target_agent,
        "user_message": user_message,
    }

    target_queue = agent_queues[target_agent]

    await target_queue.put(task)

    print(f"[{now_text(start_time)}] published task -> {target_agent}: {user_message}")

    return task_id, target_agent

async def publish_questions_every_second(start_time: float) -> list[str]:
    questions = [
        "창고 재고가 부족합니다. 오늘 안에 보충 계획을 세워주세요.",
        "배송이 지연되고 있습니다. 원인을 확인해 주세요.",
        "거래처 납기 품질을 점검하고 싶습니다.",
    ]

    target_agents = []
    for index, question in enumerate(questions):
        if index > 0:
            await asyncio.sleep(1)

        task_id, target_agent = await publish_task(question, start_time)

        target_agents.append(target_agent)
    return target_agents


async def main():
    start_time = time.perf_counter()

    workers = [
        asyncio.create_task(consume_task("inventory", start_time)),
        asyncio.create_task(consume_task("transportation", start_time)),
        asyncio.create_task(consume_task("supplier", start_time)),
    ]

    target_agents = await publish_questions_every_second(start_time)

    # 종료시점
    for agent_name in set(target_agents):
        queue = agent_queues[agent_name]
        await queue.join()

    for worker in workers:
        worker.cancel()

    await asyncio.gather(*workers, return_exceptions=True)


    print(f"[{now_text(start_time)}] 모든 작업 처리가 끝났습니다.")

asyncio.run(main())