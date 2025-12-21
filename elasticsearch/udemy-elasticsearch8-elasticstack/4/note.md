# 4 크고 작은 데이터 를 색인으로 가져오기
## 48 스크립트를 사용하여 데이터 가져오기
- python MoviesToJson.py >> moremovies.json
- curl -XDELETE 127.0.0.1:9200/movies
- curl -XPUT 127.0.0.1:9200/_bulk \
-H "Content-Type: application/json" \
--data-binary @moremovies.json
- curl -XGET "127.0.0.1:9200/movies/_search?q=mary%20poppins&pretty"
