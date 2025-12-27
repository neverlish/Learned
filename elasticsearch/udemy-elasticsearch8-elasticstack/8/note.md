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
