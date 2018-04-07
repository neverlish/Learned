### 수업준비

```
- opentutorials 데이터베이스 생성
CREATE DATABASE opentutorials;

- topic 테이블 생성
CREATE TABLE topic (   
   id int(11) NOT NULL AUTO_INCREMENT,   
   title varchar(45) NOT NULL,   
   description text,   
   created datetime NOT NULL,   
   PRIMARY KEY(id) 
) ENGINE=InnoDB;
```
