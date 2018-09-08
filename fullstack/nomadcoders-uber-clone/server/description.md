### 1 - 10 Configuring TypeORM

- create postgres database
```
psql
# CREATE DATABASE nuber;
```

### 3 - 2 Deploying to Now part Two

- Create Database
  - AWS RDS -> Create Database
    - Engine Options -> Postgres
      - Only enable options eligible for RDS Free Usage Tier
    - Input Settings
    - Data Options -> Input Database Name
    - Create
- Change Database
  - Security Group -> Inbound
  - Inbound Edit -> Source: Anywhere
- Alias Now.sh
  - `$ now alias https://nuber-server-qgvjrifnzz.now.sh nuberserver-neverlish`
