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

## 61 일반 로그 형식에 대한 Logstash Grok 예제
- https://grokdebugger.com/
  - %{IPORHOST:remote_ip} - %{DATA:user_name} \[%{HTTPDATE:access_time}\] \"%{WORD:http_method} %{DATA:url} HTTP/%{NUMBER:http_version}\" %{NUMBER:response_code} %{NUMBER:body_sent_bytes} \"%{DATA:referrer}\" \"%{DATA:agent}\"
  - 73.44.199.53 - - [01/Jun/2020:15:49:10 +0000] "GET /blog/join-in-mongodb/?relatedposts=1 HTTP/1.1" 200 131 "https://www.techstuds.com/blog/join-in-mongodb/" "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.61 Safari/537.36"

- curl -XGET "http://localhost:9200/nginx-access-logs-02/_search?pretty" \
-H "Content-Type: application/json" \
-d'{
  "size": 1, 
  "track_total_hits": true,
  "query": {
    "bool": {
      "must_not": [
        {
          "term": {
            "tags.keyword": "_grokparsefailure"
          }
        }
      ]
    }
  }
}'

- curl -XGET "http://localhost:9200/iis-log/_search?pretty" \
-H "Content-Type: application/json" \
-d'{
  "size": 1, 
  "track_total_hits": true,
  "query": {
    "bool": {
      "must_not": [
        {
          "term": {
            "tags.keyword": "_grokparsefailure"
          }
        }
      ]
    }
  }
}'
- curl -XGET "http://localhost:9200/mongo-logs-01/_search?pretty" \
-H "Content-Type: application/json" \
-d'{
  "size": 1, 
  "track_total_hits": true,
  "query": {
    "bool": {
      "must_not": [
        {
          "term": {
            "tags.keyword": "_grokparsefailure"
          }
        }
      ]
    }
  }
}'

- curl -XGET "http://localhost:9200/apache-logs/_search?pretty" \
-H "Content-Type: application/json" \
-d'{
  "size": 1,
  "track_total_hits": true,
  "query": {
  "bool": {
    "must_not": [
      {
        "term": {
          "tags.keyword": "_grokparsefailure"
        }
      }
    ]
  }
  }
}'

- curl -XGET "http://localhost:9200/es-test-logs/_search?pretty" \
-H "Content-Type: application/json" \
-d'{
  "size": 1, 
  "query": {
    "bool": {
      "must_not": [
        {
          "match": {
            "tags": "multiline"
          }
        }
      ]
    }
  }
}'

- curl -XGET "http://localhost:9200/es-slow-logs/_search?pretty" \
-H "Content-Type: application/json" \
-d'{  "size": 1}'

- curl -XGET "http://localhost:9200/mysql-slowlogs-01/_search?pretty" \
-H "Content-Type: application/json" \
-d'{

  "size":1,
  "query": {
    "bool": {
    "must_not": [
      {
        "term": {
          "tags.keyword": "_grokparsefailure"
        }
      }
    ]
  }
  }

}'

- curl -XGET "http://localhost:9200/aws-elb-logs/_search?pretty" \
-H "Content-Type: application/json" \
-d'
{
  "size": 1,
  "query": {
    "bool": {
      "must_not": [
        {
        "term": {
          "tags": {
            "value": "_grokparsefailure"
          }
        }
      }
      ]
    }
  }
}'

- curl -XGET "http://localhost:9200/aws-alb-logs/_search?pretty" \
-H "Content-Type: application/json" \
-d'
{
  "size": 1,
  "query": {
    "bool": {
      "must_not": [
        {"term": {
          "tags": {
            "value": "_grokparsefailure"
          }
        }
      }
      ]
    }
  }
}'

- curl -XGET "http://localhost:9200/aws-cloudfront-logs/_search?pretty" \
-H "Content-Type: application/json" \
-d'
{
  "query": {
    "bool": {
      "must_not": [
        {"term": {
          "tags": {
            "value": "_grokparsefailure"
          }
        }
      }
      ]
    }
  }
}'

-
curl -XDELETE localhost:9200/nginx-access-logs-02
curl -XDELETE localhost:9200/iis-log
curl -XDELETE localhost:9200/mongo-logs-01
curl -XDELETE localhost:9200/apache-logs
curl -XDELETE localhost:9200/es-test-logs
curl -XDELETE localhost:9200/es-slow-logs
curl -XDELETE localhost:9200/mysql-slowlogs-01
curl -XDELETE localhost:9200/aws-elb-logs
curl -XDELETE localhost:9200/aws-alb-logs
curl -XDELETE localhost:9200/aws-cloudfront-logs

## 62 Logstash 입력 플러그인, 1부: Heartbeat
- curl -XGET "http://localhost:9200/heartbeat/_search?pretty" \
-H "Content-Type: application/json" \
-d '{"size": 1}'

## 63 Logstash 입력 플러그인, 2부: 제너레이터 입력 및 지원배달 못한 편지 대기열(DLQ)
- curl -XGET "http://localhost:9200/generator/_search?pretty" \
-H "Content-Type: application/json" \
-d '{"size": 1}'
- curl -XGET "http://localhost:9200/dlq-sample-data/_search?pretty" \
-H "Content-Type: application/json" \
-d '{
  "track_total_hits": true,
  "size": 1
}'
- curl -XGET "http://localhost:9200/dlq-01/_search?pretty" \
-H "Content-Type: application/json" \
-d '{
  "track_total_hits": true,
  "size": 1
}'

## 64 Logstash 입력 플러그인, 3부: HTTP Poller
- curl -XGET "http://localhost:9200/http-poller-api/_search?pretty" \
-H "Content-Type: application/json" \
-d '{
  "query": {
    "match_all" :{

    }
  },
  "size": 1,
  "sort": [
    {
      "@timestamp": {
        "order": "desc"
      }
    }
  ]
}'

- curl -XGET "http://localhost:9200/http-poller-es-health/_search?pretty" \
-H "Content-Type: application/json" \
-d '{
  "query": {
    "match_all" :{

    }
  },
  "size": 1,
  "sort": [
    {
      "@timestamp": {
        "order": "desc"
      }
    }
  ]
}'

## 65 Logstash를 사용한 Syslog
- curl -XGET "http://localhost:9200/syslog-monitor/_search?pretty" \
-H "Content-Type: application/json" \
-d '{
  "size": 1
}'

## 66 Elasticsearch와 Kafka, 1부
- docker exec -it kafka bash
  - kafka-topics --bootstrap-server localhost:29092 --create --replication-factor 1 --partitions 1 --topic kafka-logs
