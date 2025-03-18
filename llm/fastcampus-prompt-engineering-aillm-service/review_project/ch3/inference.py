from openai import Client

import os
import json
from ch3.prompt_template import prompt_template, prompt_template_function_calling

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

def inference_function_calling(review):
  prompt = prompt_template_function_calling.format(review=review)
  tools = [
    {
      "type": "function",
      "function": {
        "name": "extract_positive_and_negative_keywords",
        "description": "Extract positive and negative keywords in given movie review.",
        "parameters": {
          "$schema": "https://json-schema.org/draft-07/schema#",
          "type": "object",
          "properties": {
            "positive_keywords": {
              "type": "array",
              "items": {
                "type": "string"
              }
            },
            "negative_keywords": {
              "type": "array",
              "items": {
                "type": "string"
              }
            },
          },
          "required": ["positive_keywords", "negative_keywords"]
        }
      }
    }
  ]

  
  response = client.chat.completions.create(
    model='gpt-3.5-turbo',
    messages=[
      {"role": "system", "content": "You are a helpful assistant."},
      {"role": "user", "content": prompt}
    ],
    temperature=0,
    response_format={'type': 'json_object'},
    tools=tools,
    tool_choice={"type": "function", "function": {"name": "extract_positive_and_negative_keywords"}}
  )

  output = response.choices[0].message.tool_calls[0].function.arguments
  output_json = json.loads(output)

  return output

if __name__ == "__main__":
  print(inference_function_calling("내 인생 영화"))
