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

# 3.4 [실습] 역인덱스(Inverted Index)를 활용한 데이터 조회

```
DELETE /products

PUT /products

PUT /products/_mappings
{
  "properties": {
    "name": {"type": "text"}
  }
}

PUT /products
{
  "mappings": {
    "properties": {
      "name": {"type": "text"}
    }
  }
}

GET /products

POST /products/_create/1
{
  "name": "Apple 2025 맥북 에어 13 M4 10코어"
}

POST /products/_create/2
{
  "name": "Apple 2025 에어팟 4세대"
}

POST /products/_create/3
{
  "name": "Apple 2025 아이패드 mini A17 Pro"
}

GET /products/_search
{
  "query": {
    "match": {
      "name": "Apple 2024 아이패드"
    }
  }
}

```

# 3.7 [실습] 애널라이저(Analyzer)가 토큰을 어떻게 나누는 지 확인하는 방법

```
GET /_analyze
{
  "text": "Apple 2025 맥북 에어 13 M4 10코어",
  "analyzer": "standard"
}

GET /_analyze
{
  "text": "Apple 2025 맥북 에어 13 M4 10코어",
  "char_filter": [],
  "tokenizer": "standard",
  "filter": ["lowercase"]
}
```
