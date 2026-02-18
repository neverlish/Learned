import requests
from bs4 import BeautifulSoup
import pandas as pd

# 위니브 책 정보 페이지 URL
url = "https://paullab.co.kr/bookservice/"

# 웹 페이지 가져오기
response = requests.get(url)
soup = BeautifulSoup(response.text, "html.parser")

result = []

for book in soup.select(".book_name"):
    result.append(book.text.strip())

print(result)