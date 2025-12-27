
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