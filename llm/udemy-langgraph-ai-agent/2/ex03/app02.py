import asyncio
from pathlib import Path

# pip install langchain_mcp_adapters
from langchain_mcp_adapters.client import MultiServerMCPClient

from langchain.agents import create_agent
from langchain_openai import ChatOpenAI

MCP_SERVER_PATH = Path(__file__).resolve().parent / "mcp-server-mysql" / "dist" / "index.js"

async def main():
    client = MultiServerMCPClient(
        {
            "mysql_readonly": {
                "transport": "stdio",
                "command": "node",
                "args": [str(MCP_SERVER_PATH)],
                "env": {
                    "MYSQL_HOST": "127.0.0.1",
                    "MYSQL_PORT": "3306",
                    "MYSQL_USER": "mcp_user",
                    "MYSQL_PASS": "1234567890!",
                    "MYSQL_DB": "agent_demo",
                    "ALLOW_INSERT_OPERATION": "false",
                    "ALLOW_UPDATE_OPERATION": "false",
                    "ALLOW_DELETE_OPERATION": "false"
                }
            },
            "mysql_writer": {
                "transport": "stdio",
                "command": "node",
                "args": [str(MCP_SERVER_PATH)],
                "env": {
                    "MYSQL_HOST": "127.0.0.1",
                    "MYSQL_PORT": "3306",
                    "MYSQL_USER": "user01",
                    "MYSQL_PASS": "1234567890!",
                    "MYSQL_DB": "agent_demo",
                    "ALLOW_INSERT_OPERATION": "false",
                    "ALLOW_UPDATE_OPERATION": "true",
                    "ALLOW_DELETE_OPERATION": "false"
                }
            }
        }
    )

    tools = await client.get_tools()

    model = ChatOpenAI(model="gpt-5.4-mini")

    agent = create_agent(
        model=model,
        tools=tools,
        system_prompt=(
            "너는 고객 승급 추천 에이전트다. "
            "MySql 데이터베이스 agent_demo 에는 다음 테이블만 존재한다. "
            "customers(customer_id, name, email, grade, status, created_at), "
            "orders(order_id, customer_id, total_amount, order_date), "
            "support_tickets(ticket_id, customer_id, issue_type, created_at). "
            "절대로 존재하지 않는 테이블명을 만들지 마라. "
            "문의 데이터는 반드시 support_tickets 테이블만 사용하라. "
            "먼저 mysql_readonly 도구만 사용해 조회하고, "
            "사람 승인 후에만 mysql_writer 도구로 수정하라."
        )
    )

    result = await agent.ainvoke(
        {
            "messages": [
                {
                    "role": "user",
                    "content": (
                        "먼저 현재 데이터베이스의 테이블 목록과 각 테이블 주요 컬럼을 확인한 뒤, "
                        "그 다음 최근 30일 동안 주문 금액이 높고 문의 이력이 적은 "
                        "BRONZE 고객 중 승급 후보 3명을 찾아 이유를 요약해줘. "
                        "존재하지 않는 테이블명은 절대 사용하지 마."
                    )
                }
            ]
        }
    )

    print(result)

    final_text = result["messages"][-1].content
    print("==== 최종 결과 문장 ====")
    print(final_text)



asyncio.run(main())
