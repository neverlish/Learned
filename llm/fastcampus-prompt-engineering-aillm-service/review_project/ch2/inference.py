from openai import Client

import os

from prompt_template import prompt_template, prompt_template_json

client = Client(api_key=os.environ["OPENAI_API_KEY"])

def inference(review):
  prompt = prompt_template.format(review=review)

  response = client.chat.completions.create(
    model='gpt-3.5-turbo',
    messages=[
      {"role": "system", "content": "You are a helpful assistant."},
      {"role": "user", "content": prompt}
    ],
    temperature=0,
  )

  output = response.choices[0].message.content

  return output

def inference_json(review):
  prompt = prompt_template_json.format(review=review)

  response = client.chat.completions.create(
    model='gpt-3.5-turbo',
    messages=[
      {"role": "system", "content": "You are a helpful assistant."},
      {"role": "user", "content": prompt}
    ],
    temperature=0,
  )

  output = response.choices[0].message.content

  return output

if __name__ == "__main__":
  print(inference_json("내 인생 영화"))