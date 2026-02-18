from mcp.server.fastmcp import FastMCP

# Create an MCP server
mcp = FastMCP("tutorial_2")


@mcp.tool()
def add(a: int, b: int) -> int:
    """Add two numbers"""
    return a + b


@mcp.resource("greeting://hello")
def get_greeting() -> str:
    """Get a personalized greeting"""
    return f"Hello, world!"


# 서버 실행
if __name__ == "__main__":
    mcp.run()