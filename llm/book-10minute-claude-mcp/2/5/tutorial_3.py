from mcp.server.fastmcp import FastMCP

# MCP 서버 생성
mcp = FastMCP("tutorial_3")


# Prompt 확장 예제
@mcp.prompt()
def prompt_extension(contents: str) -> str:
    """프롬프트에서 사실과 의견을 구분합니다."""
    return f"""{contents}

이 프롬프트에 대해 아래와 같은 템플릿에 맞춰 답변해줘.

* 사실:

* 의견:
"""


# 서버 실행
if __name__ == "__main__":
    mcp.run()