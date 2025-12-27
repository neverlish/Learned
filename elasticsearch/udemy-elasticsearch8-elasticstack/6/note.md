
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
