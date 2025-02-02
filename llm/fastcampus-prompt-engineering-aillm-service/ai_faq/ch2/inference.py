from openai import Client
import os

from ch2.download_data import get_data

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

if __name__ == '__main__':
  url_list = get_data()
  print(inference_many(url_list))