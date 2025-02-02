from langchain_community.document_loaders import AsyncHtmlLoader
from langchain_community.document_transformers import Html2TextTransformer
import requests
from bs4 import BeautifulSoup 

def get_data():
  url = 'https://fastcampus.co.kr/data_online_llmservice'

  response = requests.get(url)

  soup = BeautifulSoup(response.text, 'html.parser')
  img_list = soup.find_all('img')
  url_list = [tag.get('src') for tag in img_list if tag.get('src')]
  return url_list


if __name__ == '__main__':
  print(get_data())