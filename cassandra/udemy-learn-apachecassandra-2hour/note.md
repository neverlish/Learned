# 1 Apache Cassandra Overview
## 4 CRUD hands on

- create keyspace firstkeyspace with replication  = {'class': 'SimpleStrategy', 'replication_factor': '1' };
- describe firstkeyspace;
- use firstkeyspace;

- create table employee(
emp_id int,  
emp_name text,  
emp_age int,  
PRIMARY KEY((emp_id)));
- describe tables;
- describe employee;

- insert into employee
(emp_id,emp_name,emp_age)
values(20,'john',35);
- insert into employee
(emp_id,emp_name,emp_age)
values(10,'Sam',28);

- Select * from employee;
- Select * from employee where emp_id=10 ;
- Select * from employee where emp_name='Sam' ;

- Update employee set emp_age=35 where emp_id=10;
- Update employee set emp_age=45 where emp_name='Sam';

- Delete from employee where emp_id=10;
- Truncate employee;

- Drop keyspace firstkeyspace;

## 6 Partition/Clustering Key Hands on

- CREATE TABLE books_by_author(
author_name TEXT,
publish_year INT,  
book_id UUID,
book_name TEXT,
rating FLOAT,
PRIMARY KEY((author_name),publish_year,rating))
WITH CLUSTERING ORDER BY (publish_year DESC,rating ASC);

- INSERT INTO books_by_author
(author_name, publish_year, book_id, book_name, rating)
VALUES('James peterson',2008,uuid(),'Witch & Wizard',4);
- INSERT INTO books_by_author
(author_name, publish_year, book_id, book_name, rating)
VALUES('James peterson',2021,uuid(),'The Red Book',4);
- INSERT INTO books_by_author
(author_name, publish_year, book_id, book_name, rating)
VALUES('James peterson',2008,uuid(),'Cross Country',4.5);
- INSERT INTO books_by_author
(author_name, publish_year, book_id, book_name, rating)
VALUES('James peterson',2008,uuid(),'Roses are Red',3.5);
- INSERT INTO books_by_author
(author_name, publish_year, book_id, book_name, rating)
VALUES('James peterson',2018,uuid(),'President is Missing',4.5);

- SELECT * FROM books_by_author
WHERE author_name='James peterson'
AND publish_year > 2008;
- SELECT * FROM books_by_author
WHERE publish_year > 2008;
- SELECT * FROM books_by_author
WHERE publish_year > 2008 ALLOW FILTERING;
- SELECT * FROM books_by_author
WHERE author_name='James peterson'
AND publish_year > 2008 AND publish_year <2021;
- SELECT * FROM books_by_author
WHERE author_name='James peterson'
AND book_name='Cross Country';

## 8 Data Types Hands on
- ALTER TABLE books_by_author
ADD book_timeuuid TIMEUUID;
- INSERT INTO books_by_author
(author_name, publish_year, book_id, book_timeuuid, book_name, rating)
VALUES('Tony',2017,uuid(),now(), 'Crust',4);
- Select * from books_by_author where author_name='Tony';

- ALTER TABLE books_by_author
ADD emails SET<TEXT>;
- DESCRIBE books_by_author;
- UPDATE books_by_author
	SET emails = {'michael@gmail.com', 'michael@yahoo.com'}
	WHERE author_name='Michael Anderson'
AND publish_year=2017
AND rating=4;
- UPDATE books_by_author
	SET emails = emails + {'michael1234@yahoo.com', 'michael@gmail.com'}
	WHERE author_name='Michael Anderson'
AND publish_year=2017
AND rating=4;
- UPDATE books_by_author
	SET emails = emails - {'michael1234@yahoo.com'}
	WHERE author_name='Michael Anderson'
AND publish_year=2017
AND rating=4;
- UPDATE books_by_author
	SET emails = { }
	WHERE author_name='Michael Anderson'
AND publish_year=2017
AND rating=4;

- ALTER TABLE books_by_author
ADD phone LIST<TEXT>;
- UPDATE books_by_author
	SET phone = ['1-180-11100']
	WHERE author_name='Michael Anderson'
AND publish_year=2017
AND rating=4;
- UPDATE books_by_author
	SET phone = phone + ['1-180-11101']
	WHERE author_name='Michael Anderson'
AND publish_year=2017
AND rating=4;
- UPDATE books_by_author
	SET phone[1] = '1-180-11102'
	WHERE author_name='Michael Anderson'
AND publish_year=2017
AND rating=4;

- UPDATE books_by_author
	SET phone = phone - ['1-180-11101']
	WHERE author_name='Michael Anderson'
AND publish_year=2017
AND rating=4;
- UPDATE books_by_author
	SET phone = []
	WHERE author_name='Michael Anderson'
AND publish_year=2017
AND rating=4;

- ALTER TABLE books_by_author
ADD family MAP<TEXT,TEXT>;
- UPDATE books_by_author
	SET family = {'Wife': 'Sanya', 'Sibling': 'John'}
	WHERE author_name='Michael Anderson'
AND publish_year=2017
AND rating=4;
- UPDATE books_by_author
	SET family = family + {'Son': 'Albert'}
	WHERE author_name='Michael Anderson'
AND publish_year=2017
AND rating=4;
- UPDATE books_by_author
	SET family = family - {'Wife'}
	WHERE author_name='Michael Anderson'
AND publish_year=2017
AND rating=4;