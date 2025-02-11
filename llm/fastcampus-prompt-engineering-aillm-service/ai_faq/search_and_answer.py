import os
from langchain.vectorstores import FAISS
from langchain_openai import OpenAIEmbeddings

api_key = os.getenv('OPENAI_API_KEY')


def search(question):
  db = FAISS.load_local(
    'qas.index', 
    embeddings=OpenAIEmbeddings(openai_api_key=api_key),
    allow_dangerous_deserialization=True,
  )
  
  result = db.search(question, search_type='similarity')

  return result[0].metadata
  
if __name__ == '__main__':
  question = '실무에서 LLM 기반 서비스 개발할 때 문제점?'
  qa = search(question)
  print(qa['question'])
  print(qa['answer'])