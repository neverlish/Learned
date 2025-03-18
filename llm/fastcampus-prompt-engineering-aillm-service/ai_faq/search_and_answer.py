import os
from langchain.vectorstores import FAISS
from langchain_openai import OpenAIEmbeddings
from prompt_template import prompt_template
from openai import Client

api_key = os.getenv('OPENAI_API_KEY')
client = Client(api_key=api_key)

def search(question):
  db = FAISS.load_local(
    'qas.index', 
    embeddings=OpenAIEmbeddings(openai_api_key=api_key),
    allow_dangerous_deserialization=True,
  )
  
  result = db.search(question, search_type='similarity')

  return result[0].metadata


def generate_answer(context, question):
  context_join = f"""Q: {context['question']}
A: {context['answer']}"""

  prompt = prompt_template.format(context=context_join, question=question)

  response = client.chat.completions.create(
    model='gpt-4o-mini',
    messages=[
      {'role': 'system', 'content': 'You are a helpful assistant.'},
      {'role': 'user', 'content': prompt}
    ],
    temperature=0,
  )

  output = response.choices[0].message.content

  return output

  
if __name__ == '__main__':
  question = '실무에서 LLM 기반 서비스 개발할 때 문제점?'
  qa = search(question)
  print(qa['question'])
  print(qa['answer'])
  print()
  print(question)
  
  print(generate_answer(qa, question))