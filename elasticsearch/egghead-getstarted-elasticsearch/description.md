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


## 05 Search for data in Elasticsearch using the _search endpoint
- `curl -s localhost:9200/_search | jq .`
- `curl -s localhost:9200/simpsons/_search | jq .`
- `curl -s localhost:9200/simpsons,egghead/_search | jq .`
- `curl -s localhost:9200/s\*,e\*,egghead/_search | jq .`
- `curl -s localhost:9200/simpsons/episode/_search | jq .`


## 06 Paginate through search results in Elasticsearch
- `curl -s localhost:9200/simpsons/episode/_search\?size=5 | jq .`
- `curl -s localhost:9200/simpsons/episode/_search\?size=5&from=5 | jq .`


## 07 Search Elasticsearch using Query Parameters
- `curl -s localhost:9200/_all/episode/_search\?q=title:Homer | jq .`
- `curl -s localhost:9200/_all/episode/_search\?q=%2Btitle%3AHomer+%2Bseason%3A5 | jq .` # q=+title:Homer++season:5
- `curl -s localhost:9200/_all/episode/_search\?q=%2Btitle%3A%28Homer%2BBart%29+%2Bimdb_rating%3A%3E8 | jq .` # q=+title:(Homer+Bart)++imdb_rating:>8


## 08 Search for data in Elasticsearch using queryDSL language
- POST `localhost:9200/simpsons/_search`
  
  -  
  ```
  {
      "query": {
          "match": {
              "title": "Homer"
          }
      }
  }
  ```
  - 
  ```
  {
      "query": {
          "bool": {
              "must": {
                  "match": { "title": "homer" }
              },
              "must_not": {
                  "range": {
                      "imdb_rating": { "gt": 8 }
                  }
              }
          }
      }
  }
  ```
  - 
  ```
  {
      "query": {
          "bool": {
              "must": {
                  "match": { "title": "homer" }
              },
              "filter": { 
                  "range": {
                      "imdb_rating": { "gt": 4, "lt": 8 }
                  } 
              }
          }
      }
  }
  ```