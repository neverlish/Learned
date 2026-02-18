from mcp.server.fastmcp import FastMCP, Context

# Create an MCP server
mcp = FastMCP("tutorial_5")


@mcp.tool()
async def greeting(name: str, ctx: Context) -> str:
    """Get a greeting using the greeting resource"""
    try:
        result = await ctx.read_resource(f"greeting://{name}")
        content = result[0] if isinstance(result, tuple) else result
        return f"Tool response: {content}"
    except Exception as e:
        return f"Error retrieving greeting: {str(e)}"


@mcp.resource("greeting://{name}")
def get_greeting(name: str) -> str:
    """Get a personalized greeting"""
    return f"Hello, {name}!! Welcome to FastMCP!"


if __name__ == "__main__":
    mcp.run()