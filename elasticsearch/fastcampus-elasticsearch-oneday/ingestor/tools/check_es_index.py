import requests

url = "http://localhost:9200/products/_search"

payload = {}
headers = {}

response = requests.request("GET", url, headers=headers, data=payload)

print(response.text)
