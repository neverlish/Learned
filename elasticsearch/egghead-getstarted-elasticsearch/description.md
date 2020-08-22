## 01 Get data from Elasticsearch by id using http
- `docker-compose up`

- `curl -s http://localhost:9200/simpsons/episode/1 | jq`
- `curl -s http://localhost:9200/simpsons/episode/1/_source\?_source_exclude\=video_url,number_in_season,views,us_viewers_in_miiilions | jq .`
- `curl -s http://localhost:9200/simpsons/episode/1/_source\?_source_include\=video_url,number_in_season,views,us_viewers_in_miiilions | jq .`