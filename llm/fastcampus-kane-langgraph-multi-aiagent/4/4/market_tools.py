from typing import List
from polygon import RESTClient
import os
import requests
from langchain_community.document_loaders import WebBaseLoader
from langchain_core.tools import tool
from tavily import TavilyClient
import pandas as pd
from bs4 import BeautifulSoup
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser
from langchain_openai import ChatOpenAI
from dotenv import load_dotenv
load_dotenv()

tavily_client = TavilyClient(api_key=os.environ['TAVILY_API_KEY'])
polygon_client = RESTClient(api_key=os.environ["POLYGON_API_KEY"])
llm = ChatOpenAI(model="gpt-4o-mini", temperature=0)

@tool
def get_latest_filing_content(ticker: str) -> dict:
    """주어진 티커에 대한 최신 10-K, 10-Q, 8-K 파일링을 수집하고 해당 파일링의 내용을 추출합니다."""
    headers = {'User-Agent': "your.email@example.com"}
    company_tickers_url = "https://www.sec.gov/files/company_tickers.json"
    response = requests.get(company_tickers_url, headers=headers)
    if response.status_code != 200:
        return f"Failed to retrieve company tickers."
    company_tickers = response.json()
    company_data = pd.DataFrame.from_dict(company_tickers, orient='index')
    company_data['cik_str'] = company_data['cik_str'].astype(str).str.zfill(10)
    ticker = ticker.upper()
    company_data.set_index('ticker', inplace=True)
    if ticker not in company_data.index:
        return f"Ticker {ticker} not found."
    
    cik = company_data.loc[ticker, 'cik_str']
    base_url = f"https://data.sec.gov/submissions/CIK{cik}.json"
    response = requests.get(base_url, headers=headers)
    if response.status_code != 200:
        return f"Failed to retrieve filings for CIK {cik}"
    data = response.json()
    filings = data.get('filings', {}).get('recent', {})
    forms = filings.get('form', [])
    dates = filings.get('filingDate', [])
    accession_numbers = filings.get('accessionNumber', [])
    document_urls = filings.get('primaryDocument', [])
    df = pd.DataFrame({
        'form': forms,
        'date': dates,
        'accession_number': accession_numbers,
        'document_url': document_urls
    })
    df_filtered = df[df['form'].isin(['10-K', '10-Q', '8-K'])]
    latest_filings = df_filtered.sort_values('date', ascending=False).drop_duplicates('form')
    results = {}
    for _, row in latest_filings.iterrows():
        form_type = row['form']
        date = row['date']
        accession_number = row['accession_number']
        document_url = row['document_url']
        filing_url = f"https://www.sec.gov/Archives/edgar/data/{int(cik)}/{accession_number.replace('-', '')}/{document_url}"
        response = requests.get(filing_url, headers=headers)
        if response.status_code != 200:
            results[form_type] = f"Failed to retrieve the filing from {filing_url}"
        else:
            soup = BeautifulSoup(response.content, 'html.parser')
            text_content = soup.get_text(separator='\n')
            results[form_type] = {
                'date': date,
                'url': filing_url,
                'content': text_content
            }
        # LCEL 체인 구성
    def summarize_filings(filings: dict) -> dict:
        prompt = ChatPromptTemplate.from_template(
            """다음은 {form_type} 파일링의 내용입니다. 주요 재무 지표, 중요한 사실들, 
            그리고 구체적인 세부 사항을 포함하여 요약해주세요. 
            최대한 풍부한 요약이 되게끔 해주세요.
            
            각 보고서 유형에 따라 다음과 같은 중요 정보들을 포함해야 합니다:
        
            10-K (연간 보고서):
            - 주요 재무 지표 (정확한 수치와 함께 매출, 순이익, EPS 등)
            - 사업 개요 및 주요 제품/서비스 (구체적인 제품명이나 서비스명 포함)
            - 주요 시장 및 고객 (가능한 경우 주요 고객사 이름 포함)
            - 경영진의 주요 변동 사항 (해당되는 경우 구체적인 이름과 직책 포함)
            - 중요한 위험 요인 (구체적인 예시와 함께)
            - 향후 전략 및 전망
            - 주요 소송 또는 규제 이슈 (구체적인 사건명이나 관련 기관명 포함)
        
            10-Q (분기 보고서):
            - 분기별 주요 재무 지표 (정확한 수치와 전년 동기 대비 변동률)
            - 주요 제품/서비스의 실적 (구체적인 제품명이나 서비스명과 함께)
            - 시장 동향 및 경쟁 상황 (가능한 경우 경쟁사 이름 포함)
            - 단기적인 위험 요소나 기회 (구체적인 예시와 함께)
            - 주요 운영 변경 사항 (해당되는 경우 구체적인 내용 포함)
        
            8-K (수시 보고서):
            - 보고 이벤트의 성격 (예: 경영진 변경, 인수합병, 중요 계약 체결 등)
            - 해당 이벤트의 주요 내용 (관련된 모든 당사자의 이름, 금액, 날짜 등 포함)
            - 회사에 미치는 잠재적 영향 (가능한 경우 구체적인 수치 예측 포함)
            - 관련된 중요 인물의 배경 (해당되는 경우)
        
            각 항목에 대해 가능한 한 구체적인 세부 사항 (이름, 숫자, 날짜 등)을 포함해주세요. 
            그러나 전체 요약은 간결해야 하며, 각 항목은 1-3문장으로 제한해주세요.
        
            파일링 내용:
            {text}
        
            요약:"""
        )
        chain = prompt | llm | StrOutputParser()

        # 배치 처리를 위한 입력 준비
        inputs = [
            {"text": filing_data['content'], "form_type": form_type}
            for form_type, filing_data in filings.items()
            if isinstance(filing_data, dict) and 'content' in filing_data
        ]

        summaries = chain.batch(inputs)

        return {
            form_type: summary
            for (form_type, filing_data), summary in zip(filings.items(), summaries)
            if isinstance(filing_data, dict) and 'content' in filing_data
        }

    # 파일링 수집 및 요약
    summaries = summarize_filings(results)

    return summaries

@tool
def collect_competitor_news(ticker, news_count):
    """주어진 티커 관련 회사들의 최신 증권 뉴스를 수집합니다.
    Args:
        ticker (str): The company ticker.
        news_count (int): number how many news will we collect. Basic Number is 10.
    Returns:
        Dict(List): 
        A Dict of Competitors' news, each containing recent news articles' description.

    Example:
        response = competitor_news("ticker":"AAPL", "news_count":10)
        response = {"MSFT": ["US stock....", "MS invests on...", ...]}
    """
    related_companies = polygon_client.get_related_companies(ticker)
    competitors = [i.ticker for i in related_companies]
    
    competitors_news = {}
    for c in competitors:
        api_key = os.environ["POLYGON_API_KEY"]
        api_url = f"https://api.polygon.io/v2/reference/news?ticker={c}&order=desc&limit={news_count}&sort=published_utc&apiKey={api_key}"
        result = requests.get(api_url).json()
        competitors_news[c] = [i['description'] for i in result['results']]
    return competitors_news

@tool
def collect_company_news(company_name: str) -> str:
    """Collect recent news for the given company."""
    search_results = tavily_client.search(query=f"recent news about {company_name}", days=7)
    return f"Collected news and market data for {company_name}: \n{search_results}"

@tool
def collect_market_news(sector: str) -> str:
    """Collect recent market data for the given company's sector."""
    search_results = tavily_client.search(query=f"{sector} industry news", days=7)
    return f"Collected news and market data for {sector}: {search_results}"

@tool
def scrape_webpages(urls: List[str]) -> str:
    """Scrape the provided web pages for detailed information."""
    loader = WebBaseLoader(urls)
    docs = loader.load()
    return "\n\n".join(
        [f'<Document name="{doc.metadata.get("title", "")}">\n{doc.page_content}\n</Document>'
         for doc in docs]
    )
