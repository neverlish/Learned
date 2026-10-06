-- https://www.apachefriends.org/download.html
-- https://downloads.mysql.com/archives/workbench/

-- --------------------------------------------------
-- 실습용 데이터베이스를 생성합니다.
-- --------------------------------------------------
CREATE DATABASE IF NOT EXISTS agent_demo
CHARACTER SET utf8mb4
COLLATE utf8mb4_general_ci;

-- --------------------------------------------------
-- 사용할 데이터베이스를 지정합니다.
-- --------------------------------------------------
USE agent_demo;

-- --------------------------------------------------
-- 실습을 반복할 수 있도록 기존 테이블을 삭제합니다.
-- --------------------------------------------------
DROP TABLE IF EXISTS support_tickets;
DROP TABLE IF EXISTS orders;
DROP TABLE IF EXISTS customers;

-- --------------------------------------------------
-- 고객 테이블을 생성합니다.
-- --------------------------------------------------
CREATE TABLE customers (
    customer_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    grade VARCHAR(20) DEFAULT 'BRONZE',
    status VARCHAR(20) DEFAULT 'ACTIVE',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- --------------------------------------------------
-- 주문 테이블을 생성합니다.
-- 고객별 구매 금액을 분석할 때 사용합니다.
-- --------------------------------------------------
CREATE TABLE orders (
    order_id INT AUTO_INCREMENT PRIMARY KEY,
    customer_id INT NOT NULL,
    total_amount DECIMAL(10,2) NOT NULL,
    order_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (customer_id) REFERENCES customers(customer_id)
);

-- --------------------------------------------------
-- 고객 문의 테이블을 생성합니다.
-- 문의 횟수를 집계할 때 사용합니다.
-- --------------------------------------------------
CREATE TABLE support_tickets (
    ticket_id INT AUTO_INCREMENT PRIMARY KEY,
    customer_id INT NOT NULL,
    issue_type VARCHAR(50),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (customer_id) REFERENCES customers(customer_id)
);

-- --------------------------------------------------
-- 고객 샘플 데이터를 넣습니다.
-- --------------------------------------------------
INSERT INTO customers (name, email, grade, status) VALUES
('김철수', 'kim@example.com', 'BRONZE', 'ACTIVE'),
('이영희', 'lee@example.com', 'BRONZE', 'ACTIVE'),
('박민수', 'park@example.com', 'SILVER', 'ACTIVE'),
('최유진', 'choi@example.com', 'BRONZE', 'ACTIVE'),
('정다은', 'jung@example.com', 'BRONZE', 'ACTIVE');

-- --------------------------------------------------
-- 주문 샘플 데이터를 넣습니다.
-- --------------------------------------------------
INSERT INTO orders (customer_id, total_amount, order_date) VALUES
(1, 320000, NOW() - INTERVAL 10 DAY),
(1, 180000, NOW() - INTERVAL 5 DAY),
(2, 90000,  NOW() - INTERVAL 7 DAY),
(2, 120000, NOW() - INTERVAL 2 DAY),
(3, 500000, NOW() - INTERVAL 12 DAY),
(4, 260000, NOW() - INTERVAL 4 DAY),
(5, 410000, NOW() - INTERVAL 3 DAY),
(5, 150000, NOW() - INTERVAL 1 DAY);

-- --------------------------------------------------
-- 문의 샘플 데이터를 넣습니다.
-- --------------------------------------------------
INSERT INTO support_tickets (customer_id, issue_type, created_at) VALUES
(1, '배송문의', NOW() - INTERVAL 20 DAY),
(1, '교환문의', NOW() - INTERVAL 15 DAY),
(2, '배송문의', NOW() - INTERVAL 6 DAY),
(4, '결제문의', NOW() - INTERVAL 5 DAY),
(5, '배송문의', NOW() - INTERVAL 8 DAY);

-- --------------------------------------------------
-- 데이터가 잘 들어갔는지 확인합니다.
-- --------------------------------------------------
SELECT * FROM customers;
SELECT * FROM orders;
SELECT * FROM support_tickets;