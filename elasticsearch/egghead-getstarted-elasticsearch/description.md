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


## 09 Search for data in Elasticsearch using full text search
- `curl -s localhost:9200/_search\?q=homer | jq .`

- POST `localhost:9200/simpsons/_search`

  -
  ```
  {
      "query": {
          "match": {
              "spoken_words": "makes me laugh"
          }
      }
  }
  ```
  -
  ```
  {
      "query": {
          "match_phrase": {
              "spoken_words": "makes me laugh"
          }
      }
  }
  ```
  -
  ```
  {
      "query": {
          "multi_match": {
              "query": "homer simpson",
              "fields": [
                  "spoken_words",
                  "raw_character_text"
              ]
          }
      }
  }
  ```
  -
  ```
  {
      "query": {
          "query_string": {
              "fields": ["spoken_words"],
              "query": "homer OR donut"
          }
      }
  }
  ```
  -
  ```
  {
      "query": {
          "query_string": {
              "fields": ["spoken_words"],
              "query": "fri*"
          }
      }
  }
  ```
  -
  ```
  {
      "query": {
          "query_string": {
              "fields": ["spoken_words"],
              "query": "dnout~"
          }
      }
  }
  ```
  

## 10 Perform analytics using Elasticsearch aggregation queries
- POST `localhost:9200/simpsons/_search`

  -
  ```
  {
      "properties": {
          "raw_character_text": {
              "type": "text",
              "fielddata": true
          }
      }
  }
  ```

- POST `localhost:9200/simpsons/_search`
  
  - 
  ```
  {
      "size": 0,
      "aggs": {
          "avg_word_count": {
              "avg": {
                  "field": "word_count"
              }
          }
      }
  }
  ```
  -
  ```
  {
      "size": 0,
      "aggs": {
          "speaking_line_count": {
              "cardinality": {
                  "field": "raw_character_text"
              }
          }
      }
  }
  ```
  -
  ```
  {
      "size": 0,
      "aggs": {
          "word_count_percentiles": {
              "percentiles": {
                  "field": "word_count"
              }
          }
      }
  }
  ```
  -
  ```
  {
      "size": 0,
      "aggs": {
          "homer_word_count": {
              "filter": {
                  "term": {
                      "raw_character_text": "homer"
                  }
              },
              "aggs": {
                  "avg_word_count": {
                      "avg": {
                          "field": "word_count"
                      }
                  }
              }
          }
      }
  }
  ```
  -
  ```
  {
      "size": 0,
      "aggs": {
          "simpsons": {
              "filters": {
                  "other_bucket": true,
                  "other_bucket_key": "Non-Simpsons Cast",
                  "filters": {
                      "Homer": { "match": {"raw_character_text": "homer"}},
                      "Marge": { "match": {"raw_character_text": "marge"}},
                      "Bart": { "match": {"raw_character_text": "bart"}},
                      "Lisa": { "match": {"raw_character_text": "lisa"}},
                      "Maggie": { "match": {"raw_character_text": "maggie"}}
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
          "terms": {
              "raw_character_text": [
                  "homer"
              ]
          }
      },
      "size": 0,
      "aggregations": {
          "SignificantWords": {
              "significant_terms": {
                  "field": "spoken_words"
              }
          }
      }
  }
  ```

## 11 Create an index using the Elasticsearch API
- PUT `localhost:9200/foo`
  
  -
  ```
  {
      "settings": {
          "index": {
              "number_of_shards": 2,
              "number_of_replicas": 1
          }
      }
  }
  ```
- GET `localhost:9200/_cat/indices`

## 12 Create an alias for an Elasticsearch index
- POST `localhost:9200/_aliases`

  -
  ```
  {
      "actions": [
          {
              "add": {
                  "index" : "simpsons",
                  "alias": "s"
              }
          }
      ]
  }
  ```

- GET `localhost:9200/s`

- POST `localhost:9200/_aliases`

  -
  ```
  {
      "actions": [
          {
              "add": {
                  "index" : "simpsons",
                  "alias": "homer",
                  "filter": {
                      "term": {
                          "raw_characcter_text": "homer"
                      }
                  }
              }
          }
      ]
  }
  ```

- GET `localhost:9200/homer`

## 13 Close and open an Elasticsearch index
- POST `localhost:9200/simpsons/_close`
- POST `localhost:9200/simpsons/_open`


## 14 Delete an index using the Elasticsearch API
- `curl -XDELETE localhost:9200/foo`


## 15 Create a type and map in an index
- `curl -s localhost:9200/simpsons/_mappings | jq .`
- `curl -s localhost:9200/simpsons/episode/_search\?q=\* | jq .`

- PUT `localhost:9200/logs`

  - 
  ```
  {
      "mappings": {
          "client": {
              "properties": {
                  "timestamp": { "type": "date" },
                  "servername": { "type": "text" },
                  "loglevel": { "type": "keyword" },
                  "client_ip": { "type": "ip" },
                  "client_coords": { "type": "geo_point" },
                  "logevent": { "type": "text" }
              }
          }
      }
  }
  ```

- GET `localhost:9200/logs/_mappings`

- POST `localhost:9200/logs/client`

  - 
  ```
  {
      "timestamp": "2017-02-19T17:22:44.428748+00:00",
      "servername": "appserver01",
      "loglevel": "INFO",
      "client_ip": "192.168.0.15",
      "client_coords": "51.546506, -0.105806",
      "logevent": "Client logged in"
  }
  ```

- GET `localhost:9200/logs/_search?q=*`


## 16 Bulk import data into Elasticsearch
- 
```
curl -XPOST localhost:9200/_bulk\?pretty -H 'Content-Type: application/json' -d'
{ "index": { "_index": "logs", "_type": "client" } }
{ "timestamp": "2017-02-19T17:22:42", "servername": "server1", "loglevel": "ERROR", "client_ip": "192.68.0.100", "client_coords": "50, -1", "logevent": "Invalid password" }
{ "index": { "_index": "logs", "_type": "client" } }
{ "timestamp": "2017-02-19T17:22:42", "servername": "server1", "loglevel": "ERROR", "client_ip": "192.68.0.100", "client_coords": "50, -1", "logevent": "Invalid password" }
{ "index": { "_index": "logs", "_type": "client" } }
{ "timestamp": "2017-02-19T17:22:42", "servername": "server1", "loglevel": "ERROR", "client_ip": "192.68.0.100", "client_coords": "50, -1", "logevent": "Invalid password" }
'
```


## 17 Monitor Elasticsearch cluster health and status with the _cat API
- `curl localhost:9200/_cat`
- `curl localhost:9200/_cat/master`
- `curl localhost:9200/_cat/master\?v`
- `curl localhost:9200/_cat/indices\?h=h,i,dc,ss`
- `curl localhost:9200/_cat/indices\?h=h,i,dc,ss\&s=ss`
- `curl localhost:9200/_cat/health\?v`

- PUT `localhost:9200/simpsons/_settings`

  - 
  ```
  {
      "index": {
          "number_of_replicas": 0
      }
  }
  ```


## 19 Monitor Elasticsearch cluster health and status with the _cluster and _nodes APIs
- `curl localhost:9200/_cluster/health`
- `curl localhost:9200/_nodes/stats`


## 20 Reindex data from an existing Elasticsearch index
- POST `localhost:9200/_reindex`

  - 
  ```
  {
      "source": {
          "index": "simpsons"
      },
      "dest": {
          "index": "local_news"
      }
  }
  ```
  -
  ```
  {
      "source": {
          "index": "simpsons"
      },
      "dest": {
          "index": "nomoremilhouse",
          "version_type": "external"
      },
      "script": {
          "inline": "if (ctx._source.raw_character_text == 'Milhoouse') { ctx._version++; ctx._sourc.remove('raw_character_text') }",
          "lang": "painless"
      }
  }
  ```
  -
  ```
  {
      "source": {
          "index": "simpsons",
          "query": {
              "match": {
                  "raw_character_text": "Krusty the Clown"
              }
          }
      },
      "dest": {
          "index": "krusty"
      }
  }
  ```
  
- GET `localhost:9200/nomoremilhouse/script/_search?q=raw_character_text:milhouse`