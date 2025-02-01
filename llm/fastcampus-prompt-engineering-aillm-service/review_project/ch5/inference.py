
from openai import Client
import os

from langchain_core.output_parsers import StrOutputParser, PydanticOutputParser
from langchain_core.prompts import PromptTemplate
from langchain_openai import ChatOpenAI

from langchain.callbacks import get_openai_callback

  

from pydantic import BaseModel
from typing import List

import json
import pandas as pd
import ssl

from ch5.prompt_template import prompt_template, prompt_template_langchain, json_schema, prompt_template_function_calling

client = Client(api_key=os.environ["OPENAI_API_KEY"])

def inference_all(reviews):
  reviews = "\n".join([f"review_no: {review['id']}\tcontent: {review['document']}" for review in reviews])
  prompt = prompt_template.format(reviews=reviews, json_schema=json_schema)
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

class Review(BaseModel):
  review_no: int
  score: int
  positive_keywords: List[str]
  negative_keywords: List[str]

class Output(BaseModel):
  reviews: List[Review]
  summary: str

output_parser = PydanticOutputParser(pydantic_object=Output)

prompt = PromptTemplate(
  template=prompt_template_langchain,
  input_variables=["reviews"],
  partial_variables={"format_instructions": output_parser.get_format_instructions()},
)

model = ChatOpenAI(
  temperature=0.0,
  openai_api_key=os.environ["OPENAI_API_KEY"],
  model_name="gpt-3.5-turbo",
  model_kwargs={"response_format": {"type": "json_object"}},
)

chain = (prompt | model | output_parser)

def inference_all_langchain(reviews):
  reviews = "\n".join([f"review_no: {review['id']}\tcontent: {review['document']}" for review in reviews])
  with get_openai_callback() as cb:
    
    output = chain.invoke({"reviews": reviews})
    print(f"cost: ${cb.total_cost * 1340}")
    return output

def inference_all_function_calling(reviews):
  reviews = "\n".join([f"review_no: {review['id']}\tcontent: {review['document']}" for review in reviews])
  prompt = prompt_template_function_calling.format(reviews=reviews)
  tools = [
    {
      "type": "function",
      "function": {
        "name": "analyze_reviews",
        "description": "analyze reviews",
        "parameters": json_schema,
      },
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
    tool_choice={"type": "function", "function": {"name": "analyze_reviews"}}
  )

  output = response.choices[0].message.tool_calls[0].function.arguments
  output_json = json.loads(output)
  return output_json

if __name__ == "__main__":
  

  ssl._create_default_https_context = ssl._create_unverified_context

  url = 'https://github.com/e9t/nsmc/raw/refs/heads/master/ratings_test.txt'

  df = pd.read_csv(url, sep='\t')
  reviews = df[:50].to_dict(orient='records')
  print(inference_all_langchain(reviews))