-- 데이터베이스 생성
CREATE DATABASE IF NOT EXISTS movielens;
USE movielens;

-- Enable local file loading for the current session
SET GLOBAL local_infile = 1;

-- movies 테이블 생성
CREATE TABLE IF NOT EXISTS movies (
  movieID INT PRIMARY KEY NOT NULL,
  title TEXT,
  releaseDate DATE NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 데이터 로드 (파일 경로 확인 필요)
LOAD DATA LOCAL INFILE '/docker-entrypoint-initdb.d/ml-100k/u.item' 
INTO TABLE movies 
CHARACTER SET latin1 
FIELDS TERMINATED BY '|' 
LINES TERMINATED BY '\n'
(movieID, title, @var3)
SET releaseDate = CASE 
    WHEN @var3 IS NULL OR @var3 = '' OR @var3 = '0000-00-00' THEN NULL
    ELSE STR_TO_DATE(@var3, '%d-%M-%Y')
END;