import streamlit as st
import warnings
import os
import nest_asyncio
from typing import Annotated, Literal
from typing_extensions import TypedDict
from langgraph.graph.message import add_messages
from langchain_community.tools.tavily_search import TavilySearchResults
from langchain_community.utilities import ArxivAPIWrapper
from langchain_community.tools import YouTubeSearchTool
from langchain_core.tools import tool
from langgraph.prebuilt import ToolNode
from langchain_community.utilities.wolfram_alpha import WolframAlphaAPIWrapper
from langchain_chroma import Chroma
from langchain_openai import OpenAIEmbeddings, ChatOpenAI
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_community.document_loaders import YoutubeLoader
from langchain_core.documents import Document
from langgraph.graph import StateGraph, END
import re
import ast

# Suppress warnings
warnings.filterwarnings("ignore")

# Apply nest_asyncio
nest_asyncio.apply()


# Define State class
class State(TypedDict):
    messages: Annotated[list, add_messages]
    focus: Literal["web", "academic", "video", "math"]


# Define tools
web_tool = TavilySearchResults(max_results=2)


@tool
def academic_tool(query: str):
    """Academic paper search tool"""
    arxiv = ArxivAPIWrapper()
    docs = arxiv.run(query)
    return docs


@tool
def math_tool(query: str):
    """Math tool"""
    wolfram = WolframAlphaAPIWrapper()
    result = wolfram.run(query)
    return result


youtube_search_tool = YouTubeSearchTool()


@tool
def video_tool(query: str) -> str:
    """
    Retriever tool for the transcript of a YouTube video.
    If user want to find some information, this tool is good to gather youtube video information.
    query should be given in string format.
    """
    # query에 해당하는 Youtube 비디오 URL 가져오기
    urls = youtube_search_tool.run(query)
    urls = ast.literal_eval(urls)
    # URL 순회하면서 Document 객체에 내용 담기
    docs = []
    for url in urls:
        loader = YoutubeLoader.from_youtube_url(
            url, add_video_info=True, language=["en", "ko"]
        )
        scripts = loader.load()
        script_content = scripts[0].page_content
        title = scripts[0].metadata["title"]
        author = scripts[0].metadata["author"]
        doc = Document(
            page_content=script_content,
            metadata={"source": url, "title": title, "author": author},
        )
        docs.append(doc)

    # 모든 비디오의 내용을 벡터DB에 담기
    text_splitter = RecursiveCharacterTextSplitter(
        separators=["\n\n", "\n", ".", ",", " ", ""], chunk_size=1000, chunk_overlap=0
    )
    texts = text_splitter.split_documents(docs)
    embeddings = OpenAIEmbeddings()
    db = Chroma.from_documents(texts, embeddings)
    retriever = db.as_retriever()
    retrieved_docs = retriever.invoke(query)

    video_results = []

    for doc in retrieved_docs:
        title = doc.metadata.get("title", "No title available")
        author = doc.metadata.get("author", "No author available")
        script_content = doc.page_content

        video_info = f"""
        Video Information:
        ------------------
        Title: {title}
        Author: {author}
        Transcript:
        {script_content}
        ------------------
        """
        video_results.append(video_info)

    # Join all video results into a single string
    all_video_results = "\n\n".join(video_results)

    return all_video_results


tools = {
    "web": [web_tool],
    "academic": [academic_tool],
    "video": [video_tool],
    "math": [math_tool],
}
tool_nodes = {focus: ToolNode(tools[focus]) for focus in tools}

# Define chatbot function
llm = ChatOpenAI(model="gpt-4o-mini")


def chatbot(state: State):
    llm_with_tools = llm.bind_tools(tools[state["focus"]])
    result = llm_with_tools.invoke(state["messages"])
    return {"messages": [result]}


# Build graph
graph_builder = StateGraph(State)
graph_builder.add_node("chatbot", chatbot)

for focus, tool_node in tool_nodes.items():
    graph_builder.add_node(f"{focus}_tools", tool_node)


def tools_condition(state):
    if state["messages"][-1].tool_calls:
        return f"{state['focus']}_tools"
    return END


graph_builder.add_conditional_edges(
    "chatbot",
    tools_condition,
    {
        "web_tools": "web_tools",
        "academic_tools": "academic_tools",
        "video_tools": "video_tools",
        "math_tools": "math_tools",
        END: END,
    },
)
for focus in tools:
    graph_builder.add_edge(f"{focus}_tools", "chatbot")

graph_builder.set_entry_point("chatbot")
graph = graph_builder.compile()

# Streamlit app
st.title("Perplexity")

# Initialize session state
if "messages" not in st.session_state:
    st.session_state.messages = []

# Focus area selection using checkboxes
st.header("Focus")
focus_areas = {
    "Web Search": "web",
    "Academic Search": "academic",
    "Video Search": "video",
    "Math": "math",
}
selected_focus = []
for area, key in focus_areas.items():
    if st.checkbox(area, key=f"checkbox_{key}"):
        selected_focus.append(key)

# Display chat messages
for message in st.session_state.messages:
    with st.chat_message(message["role"]):
        st.markdown(message["content"])

# Chat input
if prompt := st.chat_input("Type your message here"):
    if not selected_focus:
        st.warning("Please select at least one focus area.")
    else:
        # Add user message to chat history
        st.session_state.messages.append({"role": "user", "content": prompt})
        st.chat_message("user").markdown(prompt)

        # Process the query for each selected focus area
        with st.status("Processing your request...", expanded=True) as status:
            responses = []
            for focus in selected_focus:
                status.write(f"Searching {focus.capitalize()}...")
                result = graph.invoke(
                    {"messages": st.session_state.messages, "focus": focus}
                )
                assistant_response = result["messages"][-1].content
                responses.append((focus, assistant_response))
                status.write(f"Completed {focus.capitalize()} search.")

            status.update(
                label="Processing complete!", state="complete", expanded=False
            )

        # Display assistant responses outside the status
        for focus, response in responses:
            response_with_focus = f"[{focus.upper()} SEARCH]\n\n{response}"
            st.session_state.messages.append(
                {"role": "assistant", "content": response_with_focus}
            )
            st.chat_message("assistant").markdown(response_with_focus)

# Clear chat button
if st.button("Clear Chat"):
    st.session_state.messages = []
    st.rerun()
