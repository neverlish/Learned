from openai import Client
import os
import json
from pydantic import BaseModel
from typing import List
from langchain_core.output_parsers import PydanticOutputParser
from ch2.download_data import get_data
from ch2.prompt_template import prompt_template
client = Client(api_key=os.getenv('OPENAI_API_KEY'))


def inference(url_list):
  response = client.chat.completions.create(
    model='gpt-4o-mini',
    messages=[
      {'role': 'user', 'content': [
        {"type": "text", "text": "다음 사진의 내용을 읽고 FAQ를 한국어로 만들어주세요."},
        {"type": "image_url", "image_url": {"url": url_list[0]}}
      ]}
    ],
    max_tokens=1000
  )
  output = response.choices[0].message.content
  return output

def inference_many(url_list):
  content = [
    {"type": "text", "text": "다음 사진의 내용을 읽고 FAQ를 한국어로 만들어주세요."},
  ]
  for url in url_list:
    content.append({"type": "image_url", "image_url": {"url": url}})

  response = client.chat.completions.create(
    model='gpt-4o-mini',
    messages=[
      {
        'role': 'user',
        'content': content
      }
    ],
    max_tokens=1000
  )
  output = response.choices[0].message.content
  return output

class QA(BaseModel):
  question: str
  answer: str

class Output(BaseModel):
  qa_list: List[QA]

output_parser = PydanticOutputParser(pydantic_object=Output)

def inference_many_json(url_list):
  prompt = prompt_template.format(format_instructions=output_parser.get_format_instructions())
  content = [
    {"type": "text", "text": prompt}
  ]
  for url in url_list[:5]:
    content.append({
      "type": "image_url",
      "image_url": {
        "url": url
      }
    })
  response = client.chat.completions.create(
    model='gpt-4o-mini',
    messages=[
      {
        "role": "user",
        "content": content
      }
    ],
    max_tokens=1000,
    response_format={"type": "json_object"}
  )
  output = response.choices[0].message.content
  output = json.loads(output)
  return output

if __name__ == '__main__':
  url_list = get_data()
  result = inference_many_json(url_list)
  print(json.dumps(result, indent=2, ensure_ascii=False))