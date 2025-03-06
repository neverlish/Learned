from openai import Client
import json
import requests

client = Client()

tools = [
  {
    "type": "function",
    "function": {
      "name": "get_product",
      "description": "Get the product by product_no",
      "parameters": {
        "type": "object",
        "properties": {
          "product_no": {
            "type": "number", 
            "description": "상품번호"
          },
        }, 
        "required": ["product_no"],
        "additionalProperties": False,
      },
      "strict": True,
    }
  },
  {
    "type": "function",
    "function": {
      "name": "get_shipping",
      "description": "Get the shipping info by order_no, order_seq",
      "parameters": {
        "type": "object",
        "properties": {
          "order_no": {
            "type": "number",
            "description": "주문번호"
          },
          "order_seq": {
            "type": "number",
            "description": "주문순번"
          },
        },
        "required": ["order_no", "order_seq"],
        "additionalProperties": False,
      },
      "strict": True,
    }
  },
  {
    "type": "function",
    "function": {
      "name": "get_order",
      "description": "Get the order by order_no",
      "parameters": {
        "type": "object",
        "properties": {
          "order_no": {
            "type": "number",
            "description": "주문번호"
          },
        },
        "required": ["order_no"],
        "additionalProperties": False,
      },
      "strict": True,
    }
  }
]

def get_product(product_no):
  return requests.get(f"http://127.0.0.1:8000/products/{product_no}").json()

def get_order(order_no):
  return requests.get(f"http://127.0.0.1:8000/orders/{order_no}").json()

def get_shipping(order_no, order_seq):
  return requests.get(f"http://127.0.0.1:8000/shipping/{order_no}/{order_seq}").json()

def inference(message):
  response = client.chat.completions.create(
    model="gpt-4o-mini",
    messages=[
      {"role": "user", "content": message},
    ],
    temperature=0,
    tools=tools,
  )
  if response.choices[0].finish_reason == "tool_calls":
    tool_name = response.choices[0].message.tool_calls[0].function.name
    tool_arguments = response.choices[0].message.tool_calls[0].function.arguments
    tool_arguments = json.loads(tool_arguments)

    # if tool_name == "get_product":
    #   result = get_product(tool_arguments["product_no"])
    # elif tool_name == "get_order":
    #   result = get_order(tool_arguments["order_no"])
    # elif tool_name == "get_shipping":
    #   result = get_shipping(tool_arguments["order_no"], tool_arguments["order_seq"])

    result = globals()[tool_name](**tool_arguments)
    prompt = f"""context: {result}

Q: {message}
A: """

    response_answer = client.chat.completions.create(
      model="gpt-4o-mini",
      messages=[{"role": "user", "content": prompt}],
      temperature=0,
    )

    return response_answer.choices[0].message.content
  else:
    return response.choices[0].message.content
  
def inference(message):
  response = client.chat.completions.create(
    model="gpt-4o-mini",
    messages=[
      {"role": "user", "content": message},
    ],
    temperature=0,
    tools=tools,
  )
  if response.choices[0].finish_reason == "tool_calls":
    tool_name = response.choices[0].message.tool_calls[0].function.name
    tool_arguments = response.choices[0].message.tool_calls[0].function.arguments
    tool_arguments = json.loads(tool_arguments)

    # if tool_name == "get_product":
    #   result = get_product(tool_arguments["product_no"])
    # elif tool_name == "get_order":
    #   result = get_order(tool_arguments["order_no"])
    # elif tool_name == "get_shipping":
    #   result = get_shipping(tool_arguments["order_no"], tool_arguments["order_seq"])

    result = globals()[tool_name](**tool_arguments)
    prompt = f"""context: {result}

Q: {message}
A: """

    response_answer = client.chat.completions.create(
      model="gpt-4o-mini",
      messages=[{"role": "user", "content": prompt}],
      temperature=0,
    )

    return response_answer.choices[0].message.content
  else:
    return response.choices[0].message.content

  

if __name__ == "__main__":
  print(inference("상품번호가 1234567890인 상품 좀 찾아줘."))
  print('--------')
  print(inference("""다음 주문을 찾아주세요.
                  
* 주문번호: 2024010101"""))
  print('--------')
  print(inference("""주문번호가 2024010101이고 주문순번이 0이야.
배송 좀 조회해줘."""))
  print('--------')
  print(inference("딥러닝이 뭐야?"))
  
  
