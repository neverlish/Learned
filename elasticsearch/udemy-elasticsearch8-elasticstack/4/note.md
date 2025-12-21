# 4 크고 작은 데이터 를 색인으로 가져오기
## 48 스크립트를 사용하여 데이터 가져오기
- python MoviesToJson.py >> moremovies.json
- curl -XDELETE 127.0.0.1:9200/movies
- curl -XPUT 127.0.0.1:9200/_bulk \
-H "Content-Type: application/json" \
--data-binary @moremovies.json
- curl -XGET "127.0.0.1:9200/movies/_search?q=mary%20poppins&pretty"

## 49 클라이언트 라이브러리로 가져오기
- python3 IndexRatings.py
- curl -XGET "127.0.0.1:9200/ratings/_search?pretty"

## 53 Logstash 실행
- curl -XGET "http://127.0.0.1:9200/.ds-ilm-history-5-2025.12.21-000001/_search?pretty"

## 56 Logstash를 사용하여 CSV 데이터 가져오기
- curl -XGET "http://127.0.0.1:9200/demo-csv-drop/_mapping/field/age?pretty"

## 57 Logstash를 사용하여 JSON 데이터 가져오기
- curl -XGET "http://127.0.0.1:9200/demo-json-drop/_search?pretty"
- curl -XGET "http://127.0.0.1:9200/demo-json-split-structured/_search?pretty"

## 59 Grok을 사용한 Logstash 구문 분석 및 필터링
- curl -XGET "http://127.0.0.1:9200/demo-grok/_search?pretty" \
-H "Content-Type: application/json" \
-d '
{
  "_source": [
    "logLevel",
    "time",
    "logMessage"
  ]
}
'
- curl -XDELETE http://127.0.0.1:9200/demo-grok
- curl -XGET "http://127.0.0.1:9200/demo-grok/_search?pretty" \
-H "Content-Type: application/json" \
-d '
{}
'
