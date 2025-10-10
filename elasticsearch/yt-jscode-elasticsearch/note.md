# 1.2 Elasticsearch 설치하기

- docker compose up

# 1.6 인덱스 생성하기 / 매핑 정의하기 / 도큐먼트 삽입하기

```
PUT /users

GET /users

GET /abc

PUT /boards

GET /boards

DELETE /boards

GET /boards

GET /users

PUT /users/_mappings
{
    "properties": {
        "name": {"type": "keyword"},
        "age": {"type": "integer"},
        "is_active": {"type": "boolean"}
    }
}

POST /users/_doc
{
  "name": "Alice",
  "age": 28,
  "is_active": true
}

POST /users/_doc
{
  "name": "Bob",
  "age": 30,
  "is_active": false
}

GET /users/_search
```
