DROP TABLE IF EXISTS `Bands`;
CREATE TABLE `Bands` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `album` varchar(255) DEFAULT NULL,
  `year` varchar(255) DEFAULT NULL,
  `UserId` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
LOCK TABLES `Bands` WRITE;
INSERT INTO `Bands` (`id`, `name`, `description`, `album`, `year`, `UserId`, `createdAt`, `updatedAt`)
VALUES
  (2, 'Motorhead', 'Rocket and Roll Band', 'http://s2.vagalume.com/motorhead/discografia/ace-of-spades-W320.jpg', '1979', NULL, '2016-03-13 21:50:25', '2016-03-12 21:50:25'),
  (4, 'Black Sabbath', 'Heavy Metal Band', 'http://s2.vagalume.com/black-sabbath/discografia/heaven-and-hell-W320.jpg', '1980', NULL, '2016-03-12 22:11:00', '2016-03-12 23:08:30'),
  (6, 'Deep Purple', 'Heavy Metal Band', 'http://s2.vagalume.com/deep-purple/discografia/perfect-strangers-W320.jpg', '1988', NULL, '2016-03-13 23:09:59', '2016-03-12 23:10;29'),
  (7, 'White Snake', 'Heavy Metal band', 'http://s2.vagalume.com/whitesnake/discografia/slip-of-the-tongue-W320.jpg', '1989', NULL, '2016-03-13 01:58:56', '2016-03-13 01:58:56'),
  (8, 'Iron maiden', 'Heavy Metal band', 'http://s2.vagalume.com/iron-maiden/discografia/the-number-of-the-beast-W320.jpg', '1982', NULL, '2016-03-13 02:01:24', '2016-03-13 02:01:24'),
  (9, 'Queen', 'Heavy Metal band', 'http://s2.vagalume.com/queen/discografia/greatest-hits-vol-1-W320.jpg', '1981', NULL, '2016-03-13 02:01:25', '2016-03-13 02:01:25');
UNLOCK TABLES;
