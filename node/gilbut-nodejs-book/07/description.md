## 07 - 4 데이터베이스 및 테이블 생성하기

#### 데이터베이스 생성하기
- `mysql> CREATE SCHEMA nodejs;`
- `mysql> use nodejs;`

#### 테이블 생성하기

- `mysql> CREATE TABLE node.js users (
  -> id INT NOT NULL AUTO_INCREMENT,
  -> name VARCHAR(20) NOT NULL,
  -> age INT UNSIGNED NOT NULL,
  -> married TINYINT NOT NULL,
  -> comment TEXT NULL,
  -> created_at DATETIME NOT NULL DEFAULT now(),
  -> PRIMARY KEY(id),
  -> UNIQUE INDEX name_UNIQUE (name ASC))
  -> COMMENT = '사용자 정보'
  -> DEFAULT CHARSET=utf8
  -> ENGINE=InnoDB;`

- `mysql> DESC users;`

- `mysql> CREATE TABLE nodejs.comments (
  -> id INT NOT NULL AUTO_INCREMENT,
  -> commenter INT NOT NULL,
  -> comment VARCHAR(100) NOT NULL,
  -> created_at DATETIME NOT NULL DEFAULT now(),
  -> PRIMARY KEY(id),
  -> INDEX commenter_idx (commenter ASC),
  -> CONSTRAINT commenter
  -> FOREIGN KEY (commenter)
  -> REFERENCES nodejs.users (id)
  -> ON DELETE CASCADE
  -> ON UPDATE CASCADE)
  -> COMMENT = '댓글'
  -> DEFAULT CHARSET=utf8
  -> ENGINE=InnoDB;`

- `mysql> SHOW TABLES;`

## 07 - 5 CRUD 작업하기

#### Create(생성)

- `mysql> INSERT INTO nodejs.users (name, age, married, comment) VALUES ('zero', 24, 0, '자기소개1');`
- `mysql> INSERT INTO nodejs.users (name, age, married, comment) VALUES ('nero', 32, 1, '자기소개2');`
- `mysql> INSERT INTO nodejs.comments (commenter, comment) VALUES (1, '안녕하세요. zero의 댓글입니다.');`

#### Read(조회)

- `mysql> SELECT * FROM nodejs.users;`
- `mysql> SELECT * FROM nodejs.comments;`

- `mysql> SELECT name, married FROM nodejs.users;`

- `mysql> SELECT name, married FROM nodejs.users WHERE married = 1 AND age > 30;`
- `mysql> SELECT id, name FROM nodejs.users WHERE married = 0 OR age > 30;`

- `mysql> SELECT id, name FROM nodejs.users ORDER BY age DESC;`
- `mysql> SELECT id, name FROM nodejs.users ORDER BY age DESC LIMIT 1;`
- `mysql> SELECT id, name FROM nodejs.users ORDER BY age DESC LIMIT 1 OFFSET 1;`
