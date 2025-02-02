from openai import Client
from pydantic import BaseModel
from typing import List
from langchain_core.output_parsers import PydanticOutputParser
import os
import json

from ch1.prompt_template import prompt_template, prompt_template_json
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

class QA(BaseModel):
  question: str
  answer: str

class Output(BaseModel):
  qa_list: List[QA]

output_parser = PydanticOutputParser(pydantic_object=Output)

def calculate_cost(prompt_tokens, completion_tokens):
  return(prompt_tokens / 1_000_000 * 0.15) + (completion_tokens / 1_000_000 * 0.6) * 1380

def inference_json(product_detail):
  prompt = prompt_template_json.format(
    format_instructions=output_parser.get_format_instructions(),
    product_detail=product_detail, 
  )

  response = client.chat.completions.create(
    model='gpt-4o-mini',
    messages=[
      {'role': 'system', 'content': 'You are a helpful assistant.'},
      {'role': 'user', 'content': prompt}
    ],
    temperature=0.0,
    response_format={ 'type': 'json_object' }
  )

  cost = calculate_cost(response.usage.prompt_tokens, response.usage.completion_tokens)
  print(cost)

  output = response.choices[0].message.content
  output_json = json.loads(output)
  
  return output_json

if __name__ == '__main__':
  product_detail = get_data()
  result = inference_json(product_detail)
  
  print(json.dumps(result, indent=2, ensure_ascii=False))