from mcp.server.fastmcp import FastMCP

# Create an MCP server
mcp = FastMCP("server")


@mcp.tool()
def add(a: int, b: int) -> int:
    """Add two numbers"""
    return a + b


# 서버 실행
if __name__ == "__main__":
    # mcp dev server.py
    mcp.run()