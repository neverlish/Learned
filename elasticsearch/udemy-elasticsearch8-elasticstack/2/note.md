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

## 20 Bulk API로 한 번에 여러 동영상 삽입하기
- curl -XPUT http://127.0.0.1:9200/_bulk \
-H "Content-Type: application/json" \
-d '
  { "create": { "_index": "movies", "_id": "135569" } }
  { "id": "135569", "title": "Star Trek Beyond", "year": 2016, "genre": ["Action", "Sci-Fi"]}
  { "create": { "_index": "movies", "_id": "122886" } }
  { "id": "122886", "title": "Star Trek Episode VII - The Force Awakens", "year": 20155, "genre": ["Action", "Adventure", "Fantasy", "Sci-Fi", "IMAX"]}
  { "create": { "_index": "movies", "_id": "109487" } }
  { "id": "109487", "title": "Interstellar", "year": 2014, "genre": ["Sci-Fi", "IMAX"]}
  { "create": { "_index": "movies", "_id": "58559" } }
  { "id": "58559", "title": "Dark Knight", "year": 2008, "genre": ["Action", "Crime", "Drama", "IMAX"]}
  { "create": { "_index": "movies", "_id": "1924" } }
  { "id": "1924", "title": "Plan 9 from Outerspace", "year": 1959, "genre": ["Horror", "Sci-Fi"]}
'

## 21 Elasticsearch에서 데이터 업데이트
- curl -XPOST http://127.0.0.1:9200/movies/_update/109487 \
-H "Content-Type: application/json" \
-d '
{
  "doc": {
    "title": "Interstellar"
  }
}
'
- curl -XGET http://127.0.0.1:9200/movies/_doc/109487?pretty
