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

# 3.8 [실습] 대소문자 구분없이 검색하는 방법 (lowercase)

```
DELETE /products

PUT /products
{
  "settings": {
    "analysis": {
      "analyzer": {
        "products_name_analyzer": {
          "char_filter": [],
          "tokenizer": "standard",
          "filter": ["lowercase"]
        }
      }
    }
  },
  "mappings": {
    "properties": {
      "name": {
        "type": "text",
        "analyzer": "products_name_analyzer"
      }
    }
  }
}

GET /products

POST /products/_create/1
{
  "name": "Apple 2025 아이패드 mini A17 Pro"
}

GET /products/_search
{
    "query": {
        "match": {
          "name": "apple"
        }
    }
}

GET /products/_search
{
    "query": {
        "match": {
          "name": "Apple"
        }
    }
}

GET /products/_analyze
{
    "field": "name",
    "text": "Apple 2025 아이패드 mini A17 Pro"
}
```

# 3.9 [실습] 검색할 때 필요없는 HTML 태그 제거하기 (html_strip)

```
DELETE /boards

PUT /boards
{
  "settings": {
    "analysis": {
      "analyzer": {
        "boards_content_analyzer": {
          "char_filter": ["html_strip"],
          "tokenizer": "standard",
          "filter": ["lowercase"]
        }
      }
    }
  },
  "mappings": {
    "properties": {
      "content": {
        "type": "text",
        "analyzer": "boards_content_analyzer"
      }
    }
  }
}

POST /boards/_doc
{
  "content": "<h1>Running cats, jumping quickly - over the lazy dogs!</h1>"
}

GET /boards/_search
{
  "query": {
    "match": {
      "content": "h1"
    }
  }
}

GET /boards/_analyze
{
  "field": "content",
  "text": "<h1>Running cats, jumping quickly - over the lazy dogs!</h1>"
}
```

# 3.10 [실습] 검색할 때 필요없는 불용어(a, an, the, or, but) 제거하기 (stop)

```
DELETE /boards

PUT /boards
{
  "settings": {
    "analysis": {
      "analyzer": {
        "boards_content_analyzer": {
          "char_filter": [],
          "tokenizer": "standard",
          "filter": ["lowercase", "stop"]
        }
      }
    }
  },
  "mappings": {
    "properties": {
      "content": {
        "type": "text",
        "analyzer": "boards_content_analyzer"
      }
    }
  }
}

POST /boards/_doc
{
  "content": "The cat and the dog are friends"
}

GET /boards/_search
{
  "query": {
    "match": {
      "content": "the"
    }
  }
}

GET /boards/_analyze
{
  "field": "content",
  "text": "The cat and the dog are friends"
}
```

# 3.11 [실습] 단어의 형태(-ed, -ing, -s 등)에 상관없이 검색하는 방법 (stemmer)

```
DELETE /boards

PUT /boards
{
  "settings": {
    "analysis": {
      "analyzer": {
        "boards_content_analyzer": {
          "char_filter": [],
          "tokenizer": "standard",
          "filter": ["lowercase", "stemmer"]
        }
      }
    }
  },
  "mappings": {
    "properties": {
      "content": {
        "type": "text",
        "analyzer": "boards_content_analyzer"
      }
    }
  }
}

POST /boards/_doc
{
  "content": "Running cats, jumping!"
}

GET /boards/_search
{
  "query": {
    "match": {
      "content": "cat"
    }
  }
}

GET /boards/_analyze
{
  "field": "content",
  "text": "Running cats, jumping!"
}
```

# 3.12 [실습] 동의어로 검색하는 방법 (synonym)

```
DELETE /products

PUT /products
{
    "settings": {
        "analysis": {
            "filter": {
                "products_synonyms_filter": {
                    "type": "synonym",
                    "synonyms": [
                        "notebook, 노트북, 랩탑, 휴대용 컴퓨터, laptop",
                        "samsung, 삼성"
                    ]
                }
            },
            "analyzer": {
                "products_name_analyzer": {
                    "char_filter": [],
                    "tokenizer": "standard",
                    "filter": [
                        "lowercase",
                        "products_synonyms_filter"
                    ]
                }
            }
        }
    },
    "mappings": {
        "properties": {
            "name": {
                "type": "text",
                "analyzer": "products_name_analyzer"
            }
        }
    }
}

GET /products

POST /products/_doc
{
    "name": "Samsung Notebook"
}

GET /products/_search
{
    "query": {
        "match": {
          "name": "노트북"
        }
    }
}

GET /products/_analyze
{
    "field": "name",
    "text": "Samsung Notebook"
}
```

# 4.1 한글(korean)이 제대로 검색되지 않는 현상

```
DELETE /boards

PUT /boards
{
    "settings": {
        "analysis": {
            "analyzer": {
                "boards_content_analyzer": {
                    "char_filter": [],
                    "tokenizer": "standard",
                    "filter": ["lowercase", "stop", "stemmer"]
                }
            }
        }
    },
    "mappings": {
        "properties": {
            "content": {
                "type": "text",
                "analyzer": "boards_content_analyzer"
            }
        }
    }
}

GET /boards

POST /boards/_doc
{
    "content": "백화점에서 쇼핑을 하다가 친구를 만났다."
}

GET /boards/_search
{
    "query": {
        "match": {
          "content": "친구"
        }
    }
}

GET /boards/_analyze
{
    "field": "content",
    "text": "백화점에서 쇼핑을 하다가 친구를 만났다."
}
```

# 4.2 [실습] Nori Analyzer를 활용해 한글(korean)이 제대로 검색되게 만들기

```
GET /_analyze
{
    "text": "백화점에서 쇼핑을 하다가 친구를 만났다.",
    "analyzer": "nori"
}

GET /_analyze
{
    "text": "백화점에서 쇼핑을 하다가 친구를 만났다.",
    "char_filter": [],
    "tokenizer": "nori_tokenizer",
    "filter": ["nori_part_of_speech", "nori_readingform", "lowercase"]
}

DELETE /boards

PUT /boards
{
    "settings": {
        "analysis": {
            "analyzer": {
                "boards_content_analyzer": {
                   "char_filter": [],
                    "tokenizer": "nori_tokenizer",
                    "filter": ["nori_part_of_speech", "nori_readingform", "lowercase"]
                }
            }
        }
    },
    "mappings": {
        "properties": {
            "content": {
                "type": "text",
                "analyzer": "boards_content_analyzer"
            }
        }
    }
}

GET /boards

POST /boards/_doc
{
    "content": "백화점에서 쇼핑을 하다가 친구를 만났다."
}

GET /boards/_search
{
    "query": {
        "match": {
          "content": "친구"
        }
    }
}
```
