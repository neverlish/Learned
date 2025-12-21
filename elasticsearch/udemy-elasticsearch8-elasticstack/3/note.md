# 3 Elasticsearch를 사용한 검색
## 32 “쿼리 라이트” 인터페이스

- curl -XGET "127.0.0.1:9200/movies/_search?q=title:star&pretty"
- curl -XGET "127.0.0.1:9200/movies/_search?q=+year>2010+title:trek&pretty"
- curl -XGET "127.0.0.1:9200/movies/_search?q=%2Byear%3A%3E2010+%2Btitle%3Atrek&pretty"

## 33 JSON 검색
- curl -XGET "127.0.0.1:9200/movies/_search?pretty" \
-H "Content-Type: application/json" \
-d '
{
  "query": {
    "match": {
      "title": "star"
    }
  }
}
'

- curl -XGET "127.0.0.1:9200/movies/_search?pretty" \
-H "Content-Type: application/json" \
-d '
{
  "query": {
    "bool": {
      "must": { "term": { "title": "trek" }},
      "filter": { "range": { "year": {"gte": 2010 }}}
    }
  }
}
'

## 34 구문 매치
- curl -XGET "127.0.0.1:9200/movies/_search?pretty" \
-H "Content-Type: application/json" \
-d '
{
  "query": {
    "match_phrase": {
      "title": "star wars"
    }
  }
}
'

- curl -XGET "127.0.0.1:9200/movies/_search?pretty" \
-H "Content-Type: application/json" \
-d '
{
  "query": {
    "match_phrase": {
      "title": { "query": "star beyond", "slop": 100 }
    }
  }
}
'

# 36 페이징
- curl -XGET "127.0.0.1:9200/movies/_search?size=2&from=2&pretty"
- curl -XGET "127.0.0.1:9200/movies/_search?size=2&pretty"
- curl -XGET "127.0.0.1:9200/movies/_search?pretty" \
-H "Content-Type: application/json" \
-d '
{
  "from": 2,
  "size": 2,
  "query": {"match": {"genre": "Sci-Fi"}}
}
'

## 37 정렬 (Sorting)
- curl -XGET "127.0.0.1:9200/movies/_search?sort=year&pretty"
- curl -XDELETE "127.0.0.1:9200/movies"
- curl -XPUT "127.0.0.1:9200/movies" \
-H "Content-Type: application/json" \
-d '
{
  "mappings": {
    "properties": {
      "title": {
        "type": "text",
        "fields": {
          "raw": { "type": "keyword" }
        }
      }
    }
  }
}
'
- curl -XPUT http://127.0.0.1:9200/_bulk?pretty \
-H "Content-Type: application/json" \
--data-binary @movies.json
- curl -XGET "127.0.0.1:9200/movies/_search?sort=title.raw&pretty"

## 38 필터에 대한 추가 정보
- curl -XGET "127.0.0.1:9200/movies/_search?pretty" \
-H "Content-Type: application/json" \
-d '
{
  "query": {
    "bool": {
      "must": {"match": {"genre": "Sci-Fi"}},
      "must_not": {"match": {"title": "trek"}},
      "filter": {"range": {"year": {"gte": 2010, "lt": 2015}}}
    }
  }
}
'

## 40 퍼지 쿼리
- curl -XGET "127.0.0.1:9200/movies/_search?pretty" \
-H "Content-Type: application/json" \
-d '
{
  "query": {
    "fuzzy": {
      "title": { "value": "interstellar", "fuzziness": 2 }
    }
  }
}
'

## 41 부분 매치
- curl -XDELETE "127.0.0.1:9200/movies"
- curl -XPUT "127.0.0.1:9200/movies" \
-H "Content-Type: application/json" \
-d '
{
  "mappings": {
    "properties": {
      "year": { "type": "text" }
    }
  }
}
'
- curl -XPUT http://127.0.0.1:9200/_bulk?pretty \
-H "Content-Type: application/json" \
--data-binary @movies.json
- curl -XGET "127.0.0.1:9200/movies/_search?pretty" \
-H "Content-Type: application/json" \
-d '
{
  "query": {
    "prefix": {
      "year": "201"
    }
  }
}
'
- curl -XGET "127.0.0.1:9200/movies/_search?pretty" \
-H "Content-Type: application/json" \
-d '
{
  "query": {
    "wildcard": {
      "year": "1*"
    }
  }
}
'

## 42 쿼리-타임 Search As You Type
- curl -XGET "127.0.0.1:9200/movies/_search?pretty" \
-H "Content-Type: application/json" \
-d '
{
  "query": {
    "match_phrase_prefix": {
      "title": {
        "query": "star tr",
        "slop": 10
      }
    }
  }
}
'

## 44 N-그램, 2부
- curl -XDELETE "127.0.0.1:9200/movies"
- curl -XPUT "127.0.0.1:9200/movies" \
-H "Content-Type: application/json" \
-d '
{
  "settings": {
    "analysis": {
      "filter": {
        "autocomplete_filter": {
          "type": "edge_ngram",
          "min_gram": 1,
          "max_gram": 20
        }
      },
      "analyzer": {
        "autocomplete": {
          "type": "custom",
          "tokenizer": "standard",
          "filter": [
            "lowercase",
            "autocomplete_filter"
          ]
        }
      }
    }
  }
}
'
- curl -XGET "127.0.0.1:9200/movies/_analyze?pretty" \
-H "Content-Type: application/json" \
-d '
{
  "analyzer": "autocomplete",
  "text": "sta"
}
'
- curl -XPUT "127.0.0.1:9200/movies/_mapping?pretty" \
-H "Content-Type: application/json" \
-d '
{
  "properties": {
    "title": {
      "type": "text",
      "analyzer": "autocomplete"
    }
  }
}
'
- curl -XPUT http://127.0.0.1:9200/_bulk?pretty \
-H "Content-Type: application/json" \
--data-binary @movies.json
- curl -XGET "127.0.0.1:9200/movies/_search?pretty" \
-H "Content-Type: application/json" \
-d '
{
  "query": {
    "match": {
      "title": {
        "query": "sta"
      }
    }
  }
}
'
- curl -XGET "127.0.0.1:9200/movies/_search?pretty" \
-H "Content-Type: application/json" \
-d '
{
  "query": {
    "match": {
      "title": {
        "query": "sta",
        "analyzer": "standard"
      }
    }
  }
}
'

## 45 "Search as you Type" 필드 타입
- curl --silent --request POST 'http://localhost:9200/movies/_analyze?pretty' \
-H "Content-Type: application/json" \
--data-raw '{
   "tokenizer" : "standard",
   "filter": [{"type":"edge_ngram", "min_gram": 1, "max_gram": 4}],
   "text" : "Star"
}'
- curl --request PUT 'http://localhost:9200/autocomplete' \
-H "Content-Type: application/json" \
-d '{
   "mappings": {
       "properties": {
           "title": {
               "type": "search_as_you_type"
           },
           "genre": {
               "type": "search_as_you_type"
           }
       }
   }
}'
- curl --silent --request POST 'http://localhost:9200/_reindex?pretty' \
-H "Content-Type: application/json" \
--data-raw '{
 "source": {
   "index": "movies"
 },
 "dest": {
   "index": "autocomplete"
 }
}' | grep "total\|created\|failures"
- curl -s --request GET 'http://localhost:9200/autocomplete/_search?pretty' \
-H "Content-Type: application/json" \
--data-raw '{
   "size": 5,
   "query": {
       "multi_match": {
           "query": "Sta",
           "type": "bool_prefix",
           "fields": [
               "title",
               "title._2gram",
               "title._3gram"
           ]
       }
   }
}'
- INPUT=''