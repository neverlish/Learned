import pandas as pd
import yfinance as yf
from polygon import RESTClient
from langchain.agents.agent_types import AgentType
from langchain_experimental.agents.agent_toolkits import create_pandas_dataframe_agent
import os
from langchain_core.tools import tool
from pathlib import Path
from langchain_openai import ChatOpenAI
from dotenv import load_dotenv
load_dotenv()

BASE_DIR = Path(os.getcwd())  # 현재 작업 디렉토리
DATA_DIR = BASE_DIR / "data"  # 데이터 저장용 디렉토리
CHART_DIR = BASE_DIR / "charts"  # 차트 저장용 디렉토리

polygon_client = RESTClient(api_key=os.environ["POLYGON_API_KEY"])
@tool
def fetch_stock_data(ticker: str, start_date: str, end_date: str):
    """Fetch stock data and compare with NASDAQ and competitors."""
    stock = yf.download(ticker, start=start_date, end=end_date, progress=False)
    nasdaq = yf.download('^IXIC', start=start_date, end=end_date, progress=False)
    
    df = pd.DataFrame(index=stock.index)
    df[f'{ticker}'] = stock['Adj Close']
    df['Nasdaq'] = nasdaq['Adj Close']
    
    related_companies = polygon_client.get_related_companies(ticker)
    competitors = [i.ticker for i in related_companies]
    
    for comp in competitors:
        try:
            comp_ticker = comp.replace('.', '-') if '.' in comp else comp
            comp_data = yf.download(comp_ticker, start=start_date, end=end_date, progress=False)
            if not comp_data.empty:
                df[comp] = comp_data['Adj Close']
        except Exception as e:
            continue

    csv_path = DATA_DIR / "stock_data.csv"
    df.to_csv(csv_path)
    return f"Stock file saved to {csv_path}"

@tool
def get_financial_data(ticker: str, num_years: int):
    """
    주어진 티커의 재무 데이터를 가져와 DataFrame으로 저장하고 파일 경로를 반환합니다.
    
    Parameters:
    ticker (str): 종목 코드
    num_years (int): 가져올 연도 수
    
    Returns:
    str: 저장된 파일 경로 메시지
    """
    # Polygon REST API Client 설정
    client = polygon_client
    
    # 최근 n개년간 분기별 재무제표 데이터 수집
    financials = []
    for f in client.vx.list_stock_financials(ticker):
        if "Q" in f.fiscal_period and f.end_date >= f"{pd.Timestamp.now().year - num_years}-01-01":
            financials.append(f)
    
    # DataFrame 생성할 데이터 목록 초기화
    data = {
        # 기본 정보
        "Fiscal Year": [],
        "Fiscal Period": [],
        "End Date": [],
        
        # 손익계산서 항목
        "Revenues": [],
        "Cost of Revenue": [],
        "Gross Profit": [],
        "Operating Income": [],
        "Operating Expenses": [],
        "Basic EPS": [],
        
        # 재무상태표 항목
        "Total Assets": [],
        "Current Assets": [],
        "Fixed Assets": [],
        "Intangible Assets": [],
        "Other Current Assets": [],
        "Other Non-current Assets": [],
        "Total Liabilities": [],
        "Current Liabilities": [],
        "Non-current Liabilities": [],
        "Long Term Debt": [],
        "Total Equity": [],
        "Inventory": [],
        "Accounts Payable": [],
        "Other Current Liabilities": [],
        
        # 현금흐름표 항목
        "Net Cash Flow": [],
        "Financing Cash Flow": [],
        
        # 포괄손익 항목
        "Comprehensive Income": [],
        "Other Comprehensive Income": [],
        
        # 성장률
        "YoY Growth": [],
        "QoQ Growth": [],
        
        # 재무비율
        "Current Ratio": [],  # 유동비율
        "Debt to Equity Ratio": [],  # 부채비율
        "Gross Profit Margin": [],  # 매출총이익률
        "Operating Margin": [],  # 영업이익률
        "Asset Turnover": []  # 총자산회전율
    }
    
    # 각 재무제표 항목에서 지표들을 추출하여 DataFrame 구성
    for i, f in enumerate(financials):
        # 기본 정보
        data["Fiscal Year"].append(f.fiscal_year)
        data["Fiscal Period"].append(f.fiscal_period)
        data["End Date"].append(f.end_date)

        # 재무제표 데이터 접근
        bs = f.financials.balance_sheet
        is_ = f.financials.income_statement
        cf = f.financials.cash_flow_statement
        ci = f.financials.comprehensive_income

        # 손익계산서 데이터 추출
        revenue = getattr(is_.revenues, 'value', None) if hasattr(is_, 'revenues') else None
        data["Revenues"].append(revenue)
        data["Cost of Revenue"].append(getattr(is_.cost_of_revenue, 'value', None) if hasattr(is_, 'cost_of_revenue') else None)
        data["Gross Profit"].append(getattr(is_.gross_profit, 'value', None) if hasattr(is_, 'gross_profit') else None)
        data["Operating Expenses"].append(getattr(is_.operating_expenses, 'value', None) if hasattr(is_, 'operating_expenses') else None)
        data["Operating Income"].append(getattr(is_.operating_expenses, 'value', None) if hasattr(is_, 'operating_expenses') else None)
        data["Basic EPS"].append(getattr(is_.basic_earnings_per_share, 'value', None) if hasattr(is_, 'basic_earnings_per_share') else None)
        
        # 재무상태표 데이터 추출
        data["Total Assets"].append(bs['assets'].value if 'assets' in bs else None)
        data["Current Assets"].append(bs['current_assets'].value if 'current_assets' in bs else None)
        data["Fixed Assets"].append(bs['fixed_assets'].value if 'fixed_assets' in bs else None)
        data["Intangible Assets"].append(bs['intangible_assets'].value if 'intangible_assets' in bs else None)
        data["Other Current Assets"].append(bs['other_current_assets'].value if 'other_current_assets' in bs else None)
        data["Other Non-current Assets"].append(bs['other_noncurrent_assets'].value if 'other_noncurrent_assets' in bs else None)
        data["Total Liabilities"].append(bs['liabilities'].value if 'liabilities' in bs else None)
        data["Current Liabilities"].append(bs['current_liabilities'].value if 'current_liabilities' in bs else None)
        data["Non-current Liabilities"].append(bs['noncurrent_liabilities'].value if 'noncurrent_liabilities' in bs else None)
        data["Long Term Debt"].append(bs['long_term_debt'].value if 'long_term_debt' in bs else None)
        data["Total Equity"].append(bs['equity'].value if 'equity' in bs else None)
        data["Inventory"].append(bs['inventory'].value if 'inventory' in bs else None)
        data["Accounts Payable"].append(bs['accounts_payable'].value if 'accounts_payable' in bs else None)
        data["Other Current Liabilities"].append(bs['other_current_liabilities'].value if 'other_current_liabilities' in bs else None)
        
        # 현금흐름표 데이터 추출
        data["Net Cash Flow"].append(getattr(cf.net_cash_flow, 'value', None) if hasattr(cf, 'net_cash_flow') else None)
        data["Financing Cash Flow"].append(getattr(cf.net_cash_flow_from_financing_activities, 'value', None) 
                                        if hasattr(cf, 'net_cash_flow_from_financing_activities') else None)
        
        # 포괄손익 데이터 추출
        if hasattr(ci, 'comprehensive_income_loss'):
            comp_income = ci.comprehensive_income_loss.value
        else:
            comp_income = ci.comprehensive_income.value if hasattr(ci, 'comprehensive_income') else None
        data["Comprehensive Income"].append(comp_income)
        data["Other Comprehensive Income"].append(getattr(ci.other_comprehensive_income_loss, 'value', None) 
                                                if hasattr(ci, 'other_comprehensive_income_loss') else None)
        
        # YoY 성장률 계산 (전년 동기 대비)
        if i > 3 and data["Revenues"][i-4] is not None and revenue is not None:
            yoy_growth = ((revenue - data["Revenues"][i-4]) / data["Revenues"][i-4]) * 100
        else:
            yoy_growth = None
        data["YoY Growth"].append(yoy_growth)
        
        # QoQ 성장률 계산 (직전 분기 대비)
        if i > 0 and data["Revenues"][i-1] is not None and revenue is not None:
            qoq_growth = ((revenue - data["Revenues"][i-1]) / data["Revenues"][i-1]) * 100
        else:
            qoq_growth = None
        data["QoQ Growth"].append(qoq_growth)
        
        # 재무비율 계산
        current_assets = bs['current_assets'].value if 'current_assets' in bs else None
        current_liabilities = bs['current_liabilities'].value if 'current_liabilities' in bs else None
        total_liabilities = bs['liabilities'].value if 'liabilities' in bs else None
        total_equity = bs['equity'].value if 'equity' in bs else None
        total_assets = bs['assets'].value if 'assets' in bs else None
        gross_profit = getattr(is_.gross_profit, 'value', None) if hasattr(is_, 'gross_profit') else None
        operating_income = getattr(is_.operating_expenses, 'value', None) if hasattr(is_, 'operating_expenses') else None
        
        # 유동비율 계산
        current_ratio = (current_assets / current_liabilities * 100) if (current_assets and current_liabilities) else None
        data["Current Ratio"].append(current_ratio)
        
        # 부채비율 계산
        debt_equity_ratio = (total_liabilities / total_equity * 100) if (total_liabilities and total_equity) else None
        data["Debt to Equity Ratio"].append(debt_equity_ratio)
        
        # 매출총이익률 계산
        gross_margin = (gross_profit / revenue * 100) if (gross_profit and revenue) else None
        data["Gross Profit Margin"].append(gross_margin)
        
        # 영업이익률 계산
        operating_margin = (operating_income / revenue * 100) if (operating_income and revenue) else None
        data["Operating Margin"].append(operating_margin)
        
        # 총자산회전율 계산
        asset_turnover = (revenue / total_assets) if (revenue and total_assets) else None
        data["Asset Turnover"].append(asset_turnover)

    # DataFrame 생성 및 정렬
    df = pd.DataFrame(data)
    df.sort_values(by="End Date", ascending=False, inplace=True)
    
    # 한글 컬럼명으로 변경
    korean_columns = {
        "Fiscal Year": "회계연도",
        "Fiscal Period": "회계기간",
        "End Date": "기준일",
        "Revenues": "매출액",
        "Cost of Revenue": "매출원가",
        "Gross Profit": "매출총이익",
        "Operating Income": "영업이익",
        "Operating Expenses": "영업비용",
        "Basic EPS": "기본주당순이익",
        "Total Assets": "총자산",
        "Current Assets": "유동자산",
        "Fixed Assets": "고정자산",
        "Intangible Assets": "무형자산",
        "Other Current Assets": "기타유동자산",
        "Other Non-current Assets": "기타비유동자산",
        "Total Liabilities": "총부채",
        "Current Liabilities": "유동부채",
        "Non-current Liabilities": "비유동부채",
        "Long Term Debt": "장기부채",
        "Total Equity": "총자본",
        "Inventory": "재고자산",
        "Accounts Payable": "매입채무",
        "Other Current Liabilities": "기타유동부채",
        "Net Cash Flow": "순현금흐름",
        "Financing Cash Flow": "재무활동현금흐름",
        "Comprehensive Income": "포괄손익",
        "Other Comprehensive Income": "기타포괄손익",
        "YoY Growth": "전년동기대비성장률",
        "QoQ Growth": "전기대비성장률",
        "Current Ratio": "유동비율",
        "Debt to Equity Ratio": "부채비율",
        "Gross Profit Margin": "매출총이익률",
        "Operating Margin": "영업이익률",
        "Asset Turnover": "총자산회전율"
    }
    
    df.rename(columns=korean_columns, inplace=True)
    
    # CSV 파일로 저장
    csv_path = DATA_DIR / "finance_data.csv"
    df.to_csv(csv_path, encoding='utf-8-sig')  # utf-8-sig로 저장하여 한글 깨짐 방지
    return f"재무제표 데이터가 {csv_path}에 저장되었습니다."

@tool
def analyze_data(query: str):
    """저장된 주식 데이터와 재무 데이터를 pandas_agent로 분석하고 질문에 답변합니다."""
    stock_csv_path = DATA_DIR / "stock_data.csv"
    finance_csv_path = DATA_DIR / "finance_data.csv"
    stock_df = pd.read_csv(stock_csv_path)
    finance_df = pd.read_csv(finance_csv_path)
    custom_prefix = f"""
    You are very smart analyst who can use stock_data and finance_data.
    Please analyze the data in various perspective to find valuable insight.
    You should always make the greatest output with accurate metrics and tables.
    stock_data path: {stock_csv_path}
    finance_data path: {finance_csv_path}
    """
    pandas_agent = create_pandas_dataframe_agent(
        ChatOpenAI(model="gpt-4o"),
        [stock_df, finance_df],
        verbose=True,
        agent_type=AgentType.OPENAI_FUNCTIONS,
        allow_dangerous_code=True,
        prefix=custom_prefix
    )
    
    result = pandas_agent.run(query)
    return result

@tool
def chart_generator(command: str):
    """이 도구는 create_pandas_dataframe_agent를 사용하여 차트를 생성하고 차트를 /charts 폴더에 저장합니다."""
    stock_data = pd.read_csv(DATA_DIR / "stock_data.csv")
    finance_data = pd.read_csv(DATA_DIR / "finance_data.csv")
    custom_prefix = """
    Please make the chart and save in './charts' folder.
    stock_data path is './data/stock_data.csv'.
    finance_data path is './data/finance_data.csv'
    """
    agent = create_pandas_dataframe_agent(
        ChatOpenAI(model_name="gpt-4o"), 
        [stock_data, finance_data], 
        verbose=True,
        allow_dangerous_code=True,
        agent_type=AgentType.OPENAI_FUNCTIONS,
        prefix=custom_prefix
    )
    result = agent.invoke(command)
    return result
