from mcp.server.fastmcp import FastMCP

# MCP 서버 생성
mcp = FastMCP(name="server")

# 기존 함수들 (파일 및 엑셀 관련 함수들)
# 여기에 웹 크롤링 관련 함수 추가


@mcp.tool()
def crawl_url_return_book_name(url: str) -> str:
    """
    URL을 입력 받아 해당 URL의 책 제목을 크롤링하여 반환합니다. 각 데이터는 콤마로 연결됩니다. 따라서 사용자에게 보여줄 때에는 콤마를 개행하여 보여주세요.

    Parameters
    ----------
    url : str
        크롤링할 웹 페이지 URL

    Returns
    -------
    str
        콤마로 구분된 책 제목 목록
    """
    import requests
    from bs4 import BeautifulSoup

    response = requests.get(url)
    soup = BeautifulSoup(response.text, "html.parser")

    result = []

    for book in soup.select(".book_name"):
        result.append(book.text.strip())

    return ", ".join(result)