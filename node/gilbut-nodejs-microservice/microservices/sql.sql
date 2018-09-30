CREATE DATABASE monolithic;

use monolithic;

-- 상품 관리 테이블 생성 쿼리
CREATE TABLE IF NOT EXISTS `goods` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(128) NOT NULL,
  `category` varchar(128) NOT NULL,
  `price` int NOT NULL,
  `description` text NOT NULL,
  PRIMARY KEY(`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- 회원 관리 테이블 생성 쿼리
CREATE TABLE IF NOT EXISTS `members` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(128) NOT NULL,
  `password` varchar(256) NOT NULL,
  PRIMARY KEY(`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- 구매 관리 테이블 생성 쿼리
CREATE TABLE IF NOT EXISTS `purchases` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userid` int NOT NULL,
  `goodsid` int NOT NULL,
  `date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY(`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

create user 'micro'@'%' identified by 'service';
grant all privileges on monolithic.* to 'micro'@'%';
flush privileges;

SELECT User FROM mysql.user WHERE User='micro';
