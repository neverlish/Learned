from openai import Client

import os
import json

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

def calculate_cost(prompt_tokens, completion_tokens):
  return (prompt_tokens / 1_000_000 * 0.5 + completion_tokens / 1_000_000 * 1.5) * 1340

def inference_json(review):
  prompt = prompt_template_json.format(review=review)

  response = client.chat.completions.create(
    model='gpt-3.5-turbo',
    messages=[
      {"role": "system", "content": "You are a helpful assistant."},
      {"role": "user", "content": prompt}
    ],
    temperature=0,
    response_format={'type': 'json_object'}
  )

  cost = calculate_cost(response.usage.prompt_tokens, response.usage.completion_tokens)

  output = response.choices[0].message.content
  output_json = json.loads(output)

  return output_json

if __name__ == "__main__":
  print(inference_json("내 인생 영화"))