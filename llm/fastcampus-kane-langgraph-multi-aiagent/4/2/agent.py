from langgraph.graph import StateGraph, START, MessagesState
from utils.nodes import create_chatbot
from utils.tools import get_tools
from langgraph.prebuilt import tools_condition
from langgraph.prebuilt import ToolNode

def create_agent(docs_info=None, retriever_tool=None):
    graph_builder = StateGraph(MessagesState)
    
    # chatbot 노드 생성시 docs_info와 retriever_tool 전달
    chatbot_node = create_chatbot(docs_info, retriever_tool)
    graph_builder.add_node("chatbot", chatbot_node)
    
    # tool_node도 여기서 생성
    tool_node = ToolNode(tools=get_tools(retriever_tool))
    graph_builder.add_node("tools", tool_node)
    
    graph_builder.add_conditional_edges(
        "chatbot",
        tools_condition,
    )
    graph_builder.add_edge("tools", "chatbot")
    graph_builder.add_edge(START, "chatbot")
    graph = graph_builder.compile()
    return graph