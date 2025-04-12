from tavily import TavilyClient, AsyncTavilyClient
import os
from dotenv import load_dotenv
import streamlit as st
from pydantic import BaseModel, Field
from typing import List, Dict
from langchain_openai import ChatOpenAI
from langchain_core.output_parsers import StrOutputParser
from langchain_core.prompts import ChatPromptTemplate
import streamlit as st
load_dotenv()

def search_recent_news(keyword:str) -> list:
    client = TavilyClient()
    search_result = client.search(query=keyword, max_results=5, topic="news", days=5)
    titles = [result['title'] for result in search_result['results']]
    return titles

def subtheme_generator():
    llm = ChatOpenAI(model="gpt-4o-mini", temperature=1)

    # Data model
    class NewsletterThemeOutput(BaseModel):
        """Output model for structured theme and sub-theme generation."""

        theme: str = Field(
            description="The main newsletter theme based on the provided article titles."
        )
        sub_themes: list[str] = Field(
            description="List of sub-themes or key news items to investigate under the main theme, ensuring they are specific and researchable."
        )
    # LLM with function call
    structured_llm_newsletter = llm.with_structured_output(NewsletterThemeOutput)

    # Prompt
    system = """
    You are an expert helping to create a newsletter. Based on a list of article titles provided, your task is to choose a single, 
    specific newsletter theme framed as a clear, detailed question that grabs the reader's attention. 

    In addition, generate 3 to 5 sub-themes that are highly specific, researchable news items or insights under the main theme. 
    Ensure these sub-themes reflect the latest trends in the field and frame them as compelling news topics.

    The output should be formatted as:
    - Main theme (in question form)
    - 3-5 sub-themes (detailed and focused on emerging trends, technologies, or insights).

    The sub-themes should create a clear direction for the newsletter, avoiding broad, generic topics.
    All your output should be in Korean

    """

    # This is the template that will feed into the structured LLM
    theme_prompt = ChatPromptTemplate.from_messages(
        [
            ("system", system),
            ("human", "Article titles: \n\n {recent_news}"),
        ]
    )

    # Chain together the system prompt and the structured output model
    subtheme_chain= theme_prompt | structured_llm_newsletter
    return subtheme_chain

async def search_news_for_subtheme(subtheme: str):
    async_tavily_client = AsyncTavilyClient()
    search_params = {
        "query": subtheme, 
        "max_results": 3, 
        "topic": "news", 
        "days": 7,
        "include_images": True,
        "include_raw_content": True
    }
    try:
        with st.status(label=f"'{subtheme}'와 관련된 뉴스 검색중...", expanded=True) as status:
            st.markdown(f"'{subtheme}'와 관련된 뉴스를 검색하고 있습니다.")
            response = await async_tavily_client.search(**search_params)
            images = response.get('images', [])
            results = response.get('results', [])
        
            article_info = []
            for i, result in enumerate(results):
                article_info.append({
                    'title': result.get('title', ''),
                    'image_url': images[i] if i < len(images) else '',
                    'raw_content': result.get('raw_content', '')
                })
        
            status.update(
                label=f"'{subtheme}'와 관련된 {len(article_info)}개의 기사를 찾았습니다.",
                state='complete',
                expanded=False
                )
        return {subtheme: article_info}
    except Exception as e:
        st.write(f"Error in search_news_for_subtheme: {e}")
        return {subtheme: []}