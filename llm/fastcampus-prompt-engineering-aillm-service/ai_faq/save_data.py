from ch1.download_data import get_data
from ch1.inference import inference_json
from ch2.download_data import get_data as get_urls
from ch2.inference import inference_many_json
import pickle
import os
from langchain_openai import OpenAIEmbeddings
from langchain.vectorstores import FAISS


api_key = os.getenv('OPENAI_API_KEY')


def main():
  product_detail = get_data()

  result_text = inference_json(product_detail)

  url_list = get_urls()

  result_image = inference_many_json(url_list)

  result = result_text['qa_list'] + result_image['qa_list']

  with open('qas.pkl', 'wb') as f:
    pickle.dump(result, f)

  result_questions = [row['question'] for row in result]

  db = FAISS.from_texts(
    result_questions,
    embedding=OpenAIEmbeddings(openai_api_key=api_key),
    metadatas=result
  )

  db.save_local('qas.index')

if __name__ == '__main__':
  main()