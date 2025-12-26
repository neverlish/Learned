# 5 집계
## 74 집계, 버킷 및 메트릭
- curl -XGET "http://localhost:9200/ratings/_search?pretty" \
-H "Content-Type: application/json" \
-d '{
  "query": {
    "match_phrase": {
      "title": "Star Wars Episode IV"
    }
  },
  "aggs": {
    "avg_rating": {
      "avg": {
        "field": "rating"
      }
    }
  }
}'

- curl -XGET "http://localhost:9200/ratings/_search?pretty" \
-H "Content-Type: application/json" \
-d '{
  "query": {
    "match": {
      "rating": 5.0
    }
  },
  "aggs": {
    "ratings": {
      "terms": {
        "field": "rating"
      }
    }
  }
}'