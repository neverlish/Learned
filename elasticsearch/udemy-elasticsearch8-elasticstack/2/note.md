# 2 데이터 매핑 및 색인화
## 19 JSON / REST를 통해 단일 동영상 가져오기

- curl -XPUT http://127.0.0.1:9200/movies/_doc/109487 \
  -H "Content-Type: application/json" \
  -d '{
    "genre": ["IMAX", "Sci-Fi"],
    "title": "Interstellar",
    "year": 2014
  }'
- curl -XGET http://127.0.0.1:9200/movies/_search?pretty
