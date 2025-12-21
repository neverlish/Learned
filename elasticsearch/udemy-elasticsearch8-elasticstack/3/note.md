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
