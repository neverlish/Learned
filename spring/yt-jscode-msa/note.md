# 2.2 [실습] 각 Microservice에 해당하는 DB 서버 띄우기

- docker run -e MYSQL_ROOT_PASSWORD=password -p 3306:3306 -d mysql
- docker run -e MYSQL_ROOT_PASSWORD=password -p 3307:3306 -d mysql
- docker exec -it {CONTAINER1_ID} mysql -uroot -ppassword
  - mysql> create schema `user-db`;
- docker exec -it {CONTAINER2_ID} mysql -uroot -ppassword
  - mysql> create schema `board-db`;
