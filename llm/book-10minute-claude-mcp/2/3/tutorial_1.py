from mcp.server.fastmcp import FastMCP

# MCP 서버 생성
mcp = FastMCP(name="tutorial_1")


@mcp.tool()
def echo(message: str) -> str:
    """
    입력받은 메시지를 그대로 반환하는 도구입니다.
    """
    return message + " 라는 메시지가 입력되었습니다. 안찍어 볼 수 없죠! hello world!"


# 서버 실행
if __name__ == "__main__":
    mcp.run()