from openai import Client

import os

from ch1.prompt_template import prompt_template
from ch1.download_data import get_data

client = Client(api_key=os.getenv('OPENAI_API_KEY'))

def inference(product_detail):
  prompt = prompt_template.format(product_detail=product_detail)
  response = client.chat.completions.create(
    model='gpt-4o-mini',
    messages=[
      {'role': 'system', 'content': 'You are a helpful assistant.'},
      {'role': 'user', 'content': prompt}
    ],
    temperature=0.0
  )
  return response.choices[0].message.content

if __name__ == '__main__':
  product_detail = get_data()
  print(inference(product_detail))