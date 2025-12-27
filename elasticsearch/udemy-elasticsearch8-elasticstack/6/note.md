
# 6 Kibana 사용 
## 83 Kibana 둘러보기
- curl -XPOST "localhost:9200/shakespeare/_bulk?pretty" \
-H "Content-Type: application/json" \
--data-binary @shakespeare.json

## 85 Kibana 렌즈
- docker exec -it metricbeat metricbeat modules enable system
- docker exec -it metricbeat metricbeat setup
- visit localhost:5601
  - visualize library
  - create a new visualization
  - select "Lens" visualization
  - choose "Metrics" as the type
    - system.process.cpu.pct
      - vertical axis: maximum
    - process.executable
  - Save Lens visualization

## 86 Kibana 관리
- go to Management → Stack Management -> Spaces
  - create a new space called "devops"
    - features
  - curl 'localhost:5601/api/spaces/space/devops' \
- go to Management → Stack Management -> Saved Objects
  - import the saved objects from the "devops" space

## 87 Elasticsearch SQL
- curl -XPOST "localhost:9200/_sql" \
-H "Content-Type: application/json" \
-d '{"query": "DESCRIBE movies"}'

- curl -XPOST "localhost:9200/_sql?format=txt" \
-H "Content-Type: application/json" \
-d '{"query": "DESCRIBE movies"}'

- curl -XPOST "localhost:9200/_sql" \
-H "Content-Type: application/json" \
-d '{"query": "SELECT * FROM movies LIMIT 10"}'

- curl -XPOST "localhost:9200/_sql" \
-H "Content-Type: application/json" \
-d '{"query": "SELECT * FROM movies WHERE year < 1920 ORDER BY year"}'

- curl -XPOST "localhost:9200/_sql/translate?pretty" \
-H "Content-Type: application/json" \
-d '{"query": "SELECT * FROM movies WHERE year < 1920 ORDER BY year"}'

## 88 Kibana 캔버스 사용
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
           "response": {"type":"keyword"}
       }
   }
}'

- curl --silent --request POST 'http://localhost:9200/nginx/_bulk' \
--header 'Content-Type: application/x-ndjson' \
--data-binary '@nginx_json_logs_bulk' | jq '.errors'

- curl -XPOST "localhost:9200/_sql" \
-H "Content-Type: application/json" \
-d '{"query": "SELECT SUM(bytes) AS total_transferred FROM nginx GROUP BY remote_ip ORDER BY total_transferred DESC NULLS LAST LIMIT 5"}'