from openai import Client

import os
import json

from ch4.prompt_template import prompt_template

client = Client(api_key=os.environ["OPENAI_API_KEY"])

def inference(reviews):
  reviews = "\n".join(reviews)

  prompt = prompt_template.format(reviews=reviews)

  response = client.chat.completions.create(
    model='gpt-3.5-turbo',
    messages=[
      {"role": "system", "content": "You are a helpful assistant."},
      {"role": "user", "content": prompt}
    ],
    temperature=0,
    response_format={'type': 'json_object'}
  )

  output = response.choices[0].message.content
  output_json = json.loads(output)

  return output_json

if __name__ == "__main__":
  print(inference([
    "정말 재미없네요.",
    "시간 가는줄 모르고 정말 즐겁게 봤습니다.",
    "로다쥬 나오는 영화는 무조건 추천이죠",
    "다음 편 너무 기대....",
  ]))