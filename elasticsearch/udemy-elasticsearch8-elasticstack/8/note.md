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

## 109 색인 디자인 변경(그룹화, 분할 및 축소)
- curl -XPUT "http://localhost:9200/example-index" \
-H "Content-Type: application/json" \
-d '{
  "settings": {
    "number_of_shards": 5,
    "number_of_replicas": 0
  }
}'
- cd index_design
  - for bulk in *.bulk; do curl --silent --output /dev/null -XPOST "http://localhost:9200/example-index/_doc/_bulk?refresh=true" -H "Content-Type: application/json" --data-binary @"$bulk"; echo "Bulk file $bulk INDEXED"; done

- curl -XGET "http://localhost:9200/example-index/_settings?include_defaults=true&flat_settings=true&human&pretty"

- curl --location --request PUT "http://localhost:9200/example-index/_settings" \
-H "Content-Type: application/json" \
-d '{
  "number_of_replicas": 1
}'

- curl -XGET "http://localhost:9200/_cat/shards?v"

- curl -XPUT "http://localhost:9200/example-index/_settings" \
-H "Content-Type: application/json" \
-d '{
  "index.blocks.write": true
}'

- curl -XGET "http://localhost:9200/_cluster/health?pretty"

- curl -XPOST "http://localhost:9200/example-index/_split/example-index-sharded" \
-H "Content-Type: application/json" \
-d '{
  "settings": {
    "index.number_of_shards": 3
  }
}'

- curl -XGET "http://localhost:9200/_cat/shards?v"

- curl -XPOST "http://localhost:9200/example-index-sharded/_forcemerge"

- curl -XPUT "http://localhost:9200/example-index-sharded/_settings" \
-H "Content-Type: application/json" \
-d '{
  "settings": {
    "index.routing.allocation.require._name": "node-1",
    "index.blocks.write": true
  }
}'

- curl -XPOST "http://localhost:9200/example-index-sharded/_shrink/example-index-shrunk" \
-H "Content-Type: application/json" \
-d '{
  "settings": {
    "index.routing.allocation.require._name": null,
    "index.blocks.write": null,
    "index.number_of_shards": 1
  }
}'

## 109 스냅샷
- curl -XGET "http://localhost:9200/_cluster/health?pretty"
- curl -XPUT "http://localhost:9200/_snapshot/backup-repo" \
-H "Content-Type: application/json" \
-d '{
  "type": "fs",
  "settings": {
    "location": "/usr/share/elasticsearch/backups"
  }
}'

- curl -XGET "http://localhost:9200/_snapshot/backup-repo/snapshot-1/_status"

- curl -XPOST "http://localhost:9200/_all/_close"

- curl -XPOST "http://localhost:9200/_snapshot/backup-repo/snapshot-1/_restore"

## 111 스냅샷 수명 주기 관리
- curl -XPUT "http://localhost:9200/_snapshot/backup_repository" \
-H "Content-Type: application/json" \
-d '{
  "type": "fs",
  "settings": {
    "location": "/mnt/shared/es/backup_repository"
  }
}'
- curl "http://localhost:9200/_snapshot?pretty"
- curl -XPUT "http://localhost:9200/_slm/policy/backup_policy_daily" \
-H "Content-Type: application/json" \
-d '{
  "schedule": "0 03 3 * * ?",
  "name": "<backup-{now/d}>",
  "repository": "backup_repository",
  "config": {
    "indices": ["*"]
  },
  "retention": {
    "expire_after": "60d"
  }
}'
- curl "http://localhost:9200/_slm/policy/backup_policy_daily?pretty"
- curl -XPOST "http://localhost:9200/_slm/policy/backup_policy_daily/_execute"

- curl -XPUT "http://localhost:9200/_snapshot/backup_repository_s3" \
-H "Content-Type: application/json" \
-d '{
  "type": "s3",
  "settings": {
    "bucket": "BUCKET_NAME"
  }
}'
- curl -XPUT "http://localhost:9200/_slm/policy/backup_policy_daily_s3" \
-H "Content-Type: application/json" \
-d '{
  "schedule": "0 03 3 * * ?",
  "name": "<backup-{now/d}>",
  "repository": "backup_repository_s3",
  "config": {
    "indices": ["*"]
  },
  "retention": {
    "expire_after": "60d",
    "min_count": 10,
    "max_count": 100
  }
}'
- curl -XPOST "http://localhost:9200/_slm/policy/backup_policy_daily_s3/_execute"
