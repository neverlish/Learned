## 01 Get data from Elasticsearch by id using http
- `docker-compose up`

- `curl -s http://localhost:9200/simpsons/episode/1 | jq`
- `curl -s http://localhost:9200/simpsons/episode/1/_source\?_source_exclude\=video_url,number_in_season,views,us_viewers_in_miiilions | jq .`
- `curl -s http://localhost:9200/simpsons/episode/1/_source\?_source_include\=video_url,number_in_season,views,us_viewers_in_miiilions | jq .`


## 03 Add data to Elasticsearch
- `curl -XPUT -d '{"title": "Add data to elasticsearch", "summary": "Learn to index into elasticsearch", "views": 1000}' http://localhost:9200/egghead/lessons/3 -H 'Content-Type: application/json'`

- `curl -XPOST -d '{"title": "Add some more data", "summary": "Lots of data to add", "views": 12}' http://localhost:9200/egghead/lessons -H 'Content-Type: application/json'`


## 04 Update data in Elasticsearch
- `curl -XPOST -d '{"doc" :{"views": 1001, "tags": ["elasticsearch"] } }' localhost:9200/egghead/lessons/3/_update -H 'Content-Type: application/json'`

- `curl -XPOST -d '{"script": "ctx._source.views += 1"}' localhost:9200/egghead/lessons/3/_update -H 'Content-Type: application/json'`

