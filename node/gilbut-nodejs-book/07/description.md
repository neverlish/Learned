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
