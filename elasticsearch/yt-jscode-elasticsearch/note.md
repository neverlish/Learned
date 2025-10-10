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

# 1.7 도큐먼트 저장, 조회, 수정, 삭제하기

```
POST /users/_create/1
{
  "name": "jscode",
  "age": 30,
  "is_active": true
}

GET /users/_search

PUT /users/_doc/2
{
  "name": "jason",
  "age": 30,
  "is_active": true
}

GET /users/_search

GET /users/_doc/1

PUT /users/_doc/1
{
  "name": "new"
}

POST /users/_update/2
{
  "doc": {
    "age": 10,
    "is_active": false
  }
}

DELETE /users/_doc/2

GET /users/_doc/2
```

# 3.2 [실습] Elasitcsearch의 검색 기능 테스트해보기

```
PUT /products

PUT /products/_mappings
{
  "properties": {
    "name": {"type": "text"}
  }
}

POST /products/_doc
{
  "name": "Apple 2025 맥북 에어 13 M4 10코어"
}

GET /products/_search

GET /products/_search
{
  "query": {
    "match": {
      "name": "맥북 13 에어 M4"
    }
  }
}
```
