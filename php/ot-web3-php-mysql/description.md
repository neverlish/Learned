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

### 많아지는 테이블

```
--
-- Table structure for table `author`
--
 
DROP TABLE IF EXISTS `author`;
CREATE TABLE `author` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(30) NOT NULL,
  `profile` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
 
--
-- Dumping data for table `author`
--
 
LOCK TABLES `author` WRITE;
/*!40000 ALTER TABLE `author` DISABLE KEYS */;
INSERT INTO `author` (`id`, `name`, `profile`) VALUES (1,'egoing','developer'),(2,'duru','DBA'),(3,'taeho','Data scientist');
/*!40000 ALTER TABLE `author` ENABLE KEYS */;
UNLOCK TABLES;
 
--
-- Table structure for table `topic`
--
 
DROP TABLE IF EXISTS `topic`;
CREATE TABLE `topic` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(45) NOT NULL,
  `description` text,
  `created` datetime NOT NULL,
  `author_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8;
 
--
-- Dumping data for table `topic`
--
 
LOCK TABLES `topic` WRITE;
INSERT INTO `topic` (`id`, `title`, `description`, `created`, `author_id`) VALUES (19,'MySQL ','MySQL is ...','2018-02-20 11:35:32',1),(20,'Oracle','Oracle is ...','2018-02-20 11:35:39',1),(21,'SQL Server','SQL Server is ...','2018-02-20 11:35:50',2),(22,'MongoDB','MongoDB is ..','2018-02-20 11:35:59',3),(34,'MariaDB ','MariaDB is ...','2018-02-22 11:49:09',1),(35,'OrientDB','OrientDB is ..','2018-02-22 12:13:12',1);
UNLOCK TABLES;
 
--
-- Table structure for table `user`
--
 
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `email` varchar(30) NOT NULL,
  `password` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
 
--
-- Dumping data for table `user`
--
 
LOCK TABLES `user` WRITE;
INSERT INTO `user` (`email`, `password`) VALUES ('asdf@o2.org','222222'),('qwer@o2.org','111111'),('zxcv@o2.org','333333');
UNLOCK TABLES;
```
