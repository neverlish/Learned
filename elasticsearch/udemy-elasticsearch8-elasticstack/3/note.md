# 3 Elasticsearch를 사용한 검색
## 32 “쿼리 라이트” 인터페이스

- curl -XGET "127.0.0.1:9200/movies/_search?q=title:star&pretty"
- curl -XGET "127.0.0.1:9200/movies/_search?q=+year>2010+title:trek&pretty"
- curl -XGET "127.0.0.1:9200/movies/_search?q=%2Byear%3A%3E2010+%2Btitle%3Atrek&pretty"