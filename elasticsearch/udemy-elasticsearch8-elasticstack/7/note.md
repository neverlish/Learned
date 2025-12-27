# 7 Elastic Stack을 사용한 로그 데이터 분석
## 92 데이터 프레임 변환
- curl -XPUT "localhost:9200/_cluster/settings?pretty" \
-H "Content-Type: application/json" \
-d'
{
  "persistent" : {
    "indices.id_field_data.enabled" : true
  }
}'

- curl --request PUT "http://localhost:9200/nginx" \
-H "Content-Type: application/json" \
-d '{
   "settings": {
       "number_of_shards": 1,
       "number_of_replicas": 0
   },
   "mappings": {
       "properties": {
           "time": {"type":"date","format":"dd/MMM/yyyy:HH:mm:ss Z"},
           "remote_ip": {"type":"ip"},
           "remote_user": {"type":"keyword"},
           "request": {"type":"keyword"},
           "response": {"type":"keyword"},
           "bytes": {"type":"long"},
           "referrer": {"type":"keyword"},
           "agent": {"type":"keyword"}
       }
   }
}'

- curl --location --request POST 'http://localhost:9200/nginx/_bulk' \
-H "Content-Type: application/json" \
--data-binary '@nginx_json_logs_bulk'

- curl --location --request POST 'http://localhost:9200/_transform/_preview' \
-H "Content-Type: application/json" \
--data-raw '{
   "source": {
       "index": "nginx"
   },
   "pivot": {
       "group_by": {
           "ip": {
               "terms": {
                   "field": "remote_ip"
               }
           }
       },
       "aggregations": {
           "bytes.avg": {
               "avg": {
                   "field": "bytes"
               }
           },
           "bytes.sum": {
               "sum": {
                   "field": "bytes"
               }
           },
           "requests.total": {
               "value_count": {
                   "field": "_id"
               }
           },
           "requests.last": {
               "scripted_metric": {
                   "init_script": "state.timestamp = 0L; state.date = '\'''\''",
                   "map_script": "def doc_date = doc['\''time'\''].getValue().toInstant().toEpochMilli();if (doc_date > state.timestamp){state.timestamp = doc_date;state.date = doc['\''time'\''].getValue();}",
                   "combine_script": "return state",
                   "reduce_script": "def date = '\'''\'';def timestamp = 0L;for (s in states) {if (s.timestamp > (timestamp)){timestamp = s.timestamp; date = s.date;}} return date"
               }
           },
           "requests.first": {
               "scripted_metric": {
                   "init_script": "state.timestamp = 1609455599000L; state.date = '\'''\''",
                   "map_script": "def doc_date = doc['\''time'\''].getValue().toInstant().toEpochMilli();if (doc_date < state.timestamp){state.timestamp = doc_date;state.date = doc['\''time'\''].getValue();}",
                   "combine_script": "return state",
                   "reduce_script": "def date = '\'''\'';def timestamp = 0L;for (s in states) {if (s.timestamp < (timestamp)){timestamp = s.timestamp; date = s.date;}} return date"
               }
           }
       }
   }
}'

- curl --location --request PUT 'http://localhost:9200/_transform/nginx_transform' \
-H "Content-Type: application/json" \
--data-raw '{
	"source": {
       "index": "nginx"
   },
   "pivot": {
       "group_by": {
           "ip": {
               "terms": {
                   "field": "remote_ip"
               }
           }
       },
       "aggregations": {
           "bytes.avg": {
               "avg": {
                   "field": "bytes"
               }
           },
           "bytes.sum": {
               "sum": {
                   "field": "bytes"
               }
           },
           "requests.total": {
               "value_count": {
                   "field": "_id"
               }
           },
           "requests.last": {
               "scripted_metric": {
                   "init_script": "state.timestamp = 0L; state.date = '\'''\''",
                   "map_script": "def doc_date = doc['\''time'\''].getValue().toInstant().toEpochMilli();if (doc_date > state.timestamp){state.timestamp = doc_date;state.date = doc['\''time'\''].getValue();}",
                   "combine_script": "return state",
                   "reduce_script": "def date = '\'''\'';def timestamp = 0L;for (s in states) {if (s.timestamp > (timestamp)){timestamp = s.timestamp; date = s.date;}} return date"
               }
           },
           "requests.first": {
               "scripted_metric": {
                   "init_script": "state.timestamp = 1609455599000L; state.date = '\'''\''",
                   "map_script": "def doc_date = doc['\''time'\''].getValue().toInstant().toEpochMilli();if (doc_date < state.timestamp){state.timestamp = doc_date;state.date = doc['\''time'\''].getValue();}",
                   "combine_script": "return state",
                   "reduce_script": "def date = '\'''\'';def timestamp = 0L;for (s in states) {if (s.timestamp < (timestamp)){timestamp = s.timestamp; date = s.date;}} return date"
               }
           }
       }
   },
   "description": "Transferend bytes and request dates overview for remote_ip",
   "dest": {
       "index": "nginx_transformed"
   }
}'


- curl --request POST 'http://localhost:9200/_transform/nginx_transform/_start'

- visit localhost:5601
  - Stack Management -> Transforms
