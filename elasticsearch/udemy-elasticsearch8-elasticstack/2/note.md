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

## 22 Elasticsearch에서 데이터 삭제
- curl -XDELETE http://127.0.0.1:9200/movies/_doc/58559

## 24 동시성 처리
- curl -XGET http://127.0.0.1:9200/movies/_doc/109487?pretty
- curl -XPUT http://127.0.0.1:9200/movies/_doc/109487?if_seq_no=7&if_primary_term=1 \
-H "Content-Type: application/json" \
-d '
{
  "genre": ["IMAX", "Sci-Fi"],
  "title": "Interstellar foo",
  "year": 2014
}
'

## 25 분석기 및 토크나이저 사용
- curl -XGET http://127.0.0.1:9200/movies/_search?pretty \
-H "Content-Type: application/json" \
-d '
{
  "query": {
    "match": {
      "title": "Star Trek"
    }
  }
}
'

- curl -XGET http://127.0.0.1:9200/movies/_search?pretty \
-H "Content-Type: application/json" \
-d '
{
  "query": {
    "match_phrase": {
      "genre": "sci"
    }
  }
}
'

- curl -XDELETE http://127.0.0.1:9200/movies

- curl -XPUT http://127.0.0.1:9200/movies \
-H "Content-Type: application/json" \
-d '
{
  "mappings": {
    "id": { "type": "integer" },
    "year": { "type": "date" },
    "genre": { "type": "keyword" },
    "title": { "type": "text", "analyzer": "english" }
  }
}
'

- curl -XPUT http://127.0.0.1:9200/_bulk?pretty \
-H "Content-Type: application/json" \
--data-binary @movies.json

- curl -XGET http://127.0.0.1:9200/movies/_search?pretty \
-H "Content-Type: application/json" \
-d '
{
  "query": {
    "match_phrase": {
      "genre": "Sci-Fi"
    }
  }
}
'

## 27 데이터 모델링 및 페어런트-차일드 관계, 2부
- curl -XPUT http://127.0.0.1:9200/series \
-H "Content-Type: application/json" \
-d '
{
  "mappings": {
    "properties" :{
      "film_to_franchise": {
        "type": "join",
        "relations": { "franchise": "film" }
      }
    }
  }
}
'

- curl -XPUT http://127.0.0.1:9200/_bulk?pretty \
-H "Content-Type: application/json" \
--data-binary @series.json

- curl -XGET http://127.0.0.1:9200/_search?pretty \
-H "Content-Type: application/json" \
-d '
{
  "query": {
    "has_parent": {
      "parent_type": "franchise",
      "query": {
        "match": {
          "title": "Star Wars"
        }
      }
    }
  }
}
'

- curl -XGET http://127.0.0.1:9200/_search?pretty \
-H "Content-Type: application/json" \
-d '
{
  "query": {
    "has_parent": {
      "parent_type": "franchise",
      "query": {
        "match": {
          "title": "Star Wars"
        }
      }
    }
  }
}
'

- curl -XGET http://127.0.0.1:9200/_search?pretty \
-H "Content-Type: application/json" \
-d '
{
  "query": {
    "has_child": {
      "type": "film",
      "query": {
        "match": {
          "title": "The Forece Awakens"
        }
      }
    }
  }
}
'
