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
