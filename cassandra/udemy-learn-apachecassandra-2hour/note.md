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
