from utils.models import NewsletterThemeOutput
from typing import TypedDict, Dict, List, Annotated
from langgraph.graph.message import add_messages


def merge_dicts(left: Dict, right: Dict) -> Dict:
    return {**left, **right}


class State(TypedDict):
    keyword: str
    article_titles: List[str]
    newsletter_theme: NewsletterThemeOutput
    sub_theme_articles: Dict[str, List[Dict]]
    results: Annotated[Dict[str, str], merge_dicts]
    messages: Annotated[List, add_messages]
