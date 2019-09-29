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

## 63 Populating PostgreSQL Database in Docker
- `$ pg_dump slack -f dump.sql`
- `$ dropdb -h localhost -p 3030 -U postgres slack`
- `$ createdb -h localhost -p 3030 -U postgres slack`
- `$ psql -h localhost -p 3030 -U postgres slack < dump.sql`

## 66 Sharing Docker Images
- `$ docker build -t neverlish/slack-clone-server:latest .`
- `$ docker push neverlish/slack-clone-server:latest`
- `$ docker pull neverlish/slack-clone-server:latest`

## 69 Deploying Slack Clone to AWS
- `$ ssh -i KEYFILE.pem ubuntu@PUBLIC_DNS`
  - `$ curl -fsSL get.docker.com -o get-docker.sh`
  - `$ sudo sh get-docker.sh`
  - `$ sudo usermod -aG docker ubuntu`
  - https://docs.docker.com/compose/install/#install-compose
    - `ubuntu$ sudo curl -L "https://github.com/docker/compose/releases/download/1.24.1/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose`
    - `ubuntu$ sudo chmod +x /usr/local/bin/docker-compose`
  - `$ scp -i .ssh/KEYFILE docker-compose.yml mysite.template ubuntu@PUBLIC_DNS:~`