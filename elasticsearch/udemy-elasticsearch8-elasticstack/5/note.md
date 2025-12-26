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

## 75 히스토그램
- curl -XGET "http://localhost:9200/ratings/_search?pretty" \
-H "Content-Type: application/json" \
-d '{
  "aggs": {
    "whole_ratings": {
      "histogram": {
        "field": "rating",
        "interval": 1.0
      }
    }
  }
}'

- curl -XGET "http://localhost:9200/movies/_search?pretty" \
-H "Content-Type: application/json" \
-d '{
  "aggs": {
    "release": {
      "histogram": {
        "field": "year",
        "interval": 10
      }
    }
  }
}'
