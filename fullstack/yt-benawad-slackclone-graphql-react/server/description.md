## 03 Creating PostgreSQL Database Models with Sequelize

- psql
  - `# create database slack;`

## 43 Testing a GraphQL Server
- `$ chmod +x reset_test_db.sh`
- `$ pg_dump testslack -f dump.sql`

## 60 Starting to Setup Docker
- `$ docker build -t slack-clone-server .`
- `$ docker run -p 8081:8081 slack-clone-server`

## 61 Docker Compose Node.js, Redis, and PostgreSQL
- `$ docker-compose up`
- `$ docker-compose down`
- `$ docker-compose up -d`