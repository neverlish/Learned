from langchain_community.document_loaders import AsyncHtmlLoader
from langchain_community.document_transformers import Html2TextTransformer

def get_data():
  url = 'https://fastcampus.co.kr/data_online_llmservice'

  loader = AsyncHtmlLoader(url, verify_ssl=False)

  docs = loader.load()

  html2text = Html2TextTransformer()
  docs_transformed = html2text.transform_documents(docs)

  content = docs_transformed[0].page_content
  return content

if __name__ == '__main__':
  print(get_data())