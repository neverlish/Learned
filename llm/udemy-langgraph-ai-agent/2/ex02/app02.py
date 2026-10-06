# pip install yfinance

from langchain_core.tools import tool
from langchain_openai import ChatOpenAI
from langchain_core.messages import HumanMessage,ToolMessage
import yfinance as yf

@tool
def get_stock_price(ticker: str) -> float:
    """주식 거래소 ticker에 맞는 회사 주가를 반환 한다."""
    ticker = ticker.upper().strip()

    stock = yf.Ticker(ticker)
    hist = stock.history(period="1d", interval="1m")

    if not hist.empty:
        latest_price = hist["Close"].dropna().iloc[-1]
        return float(latest_price)

    hist = stock.history(period="5d")

    if not hist.empty:
        latest_price = hist["Close"].dropna().iloc[-1]
        return float(latest_price)

    raise ValueError(f"주가 데이터를 찾을 수 없습니다: {ticker}")


llm = ChatOpenAI(model="gpt-5.4-mini", temperature=0)
llm_with_tools = llm.bind_tools([get_stock_price])

messages = [HumanMessage(content="애플의 주가는 얼마인가요?")]

ai_msg = llm_with_tools.invoke(messages)
messages.append(ai_msg)

for tool_call in ai_msg.tool_calls:

    print("도구 이름:", tool_call["name"])
    print("전달 인자:", tool_call["args"])

    result = get_stock_price.invoke(tool_call["args"])

    print("실행 결과:", result)

    tool_msg = ToolMessage(
        content=str(result),  # 문자열로 넣기
        tool_call_id=tool_call["id"],  # 이 도구 호출과 연결
        name=tool_call["name"]  # 도구 이름
    )

    messages.append(tool_msg)

final_response = llm_with_tools.invoke(messages)

print("최종 응답:", final_response.content)
