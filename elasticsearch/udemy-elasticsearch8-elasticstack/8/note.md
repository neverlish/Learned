# 8 Elasticsearch 작업
## 101 색인 추가 확장 전략
- visit localhost:5601 -> Dev Tools
  - GET shakespeare/_settings
  - put testindex
{
  "settings": {
    "number_of_shards": 3,
    "number_of_replicas": 1
  }
}
  - GET testindex
  - DELETE testindex

## 106 모니터링 
- visit localhost:5601 -> Stack monitoring
  - turn on monitoring

## 107 일반적인 문제 해결
- curl --request PUT "http://localhost:9200/_snapshot/backup-repo" \
-H "Content-Type: application/json" \
-d '{
  "type": "fs",
  "settings": {
    "location": "/home/student/backups/backup-repo"
  }
}'
- curl --request PUT "http://localhost:9200/_snapshot/backup-repo/snapshot-1"
- curl --request GET "http://localhost:9200/_snapshot/backup-repo/snapshot-1?pretty"

- curl http://localhost:9200/_cluster/allocation/explain?pretty
- curl http://localhost:9200/_cat/shards?v

## 108 장애 조치, 1부
- curl -XGET "http://localhost:9200/_cluster/health?pretty"
- curl -XGET "http://localhost:9201/_cluster/health?pretty"
- curl -XGET "http://localhost:9201/shakespeare/_search?pretty"