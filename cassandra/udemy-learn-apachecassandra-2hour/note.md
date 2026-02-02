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