from langgraph.graph import StateGraph, END, START
from utils.state import State
from utils.nodes import (
    search_keyword_news,
    generate_newsletter_theme,
    search_sub_theme_articles,
    write_newsletter_section,
    aggregate_results,
    edit_newsletter
)
import logging

logger = logging.getLogger(__name__)

def create_newsletter_graph():
    logger.info("Creating newsletter graph")
    workflow = StateGraph(State)
    workflow.add_node("editor", edit_newsletter)
    # 노드 추가
    workflow.add_node("search_news", search_keyword_news)
    workflow.add_node("generate_theme", generate_newsletter_theme)
    workflow.add_node("search_sub_themes", search_sub_theme_articles)
    workflow.add_node("aggregate", aggregate_results)
    
    workflow.add_edge("aggregate", "editor")
    workflow.add_edge("editor", END)
    # 그래프 노드 추가 부분 수정
    for i in range(5):
        node_name = f"write_section_{i}"
        workflow.add_node(node_name, lambda s, i=i: write_newsletter_section(s, s['newsletter_theme'].sub_themes[i]))

    # 엣지 연결
    workflow.add_edge(START, "search_news")
    workflow.add_edge("search_news", "generate_theme")
    workflow.add_edge("generate_theme", "search_sub_themes")
    for i in range(5):
        workflow.add_edge("search_sub_themes", f"write_section_{i}")
        workflow.add_edge(f"write_section_{i}", "aggregate")
    
    logger.info("Newsletter graph created successfully")
    return workflow.compile()