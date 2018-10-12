## 08 - 2 몽고디비 설치하기

- `$ mongo`

- `> use admin`
- `> db.createUser({ user: 'NAME', pwd: 'PASSWORD', roles: ['root'] })`

- `$ mongo admin -u NAME -p PASSWORD`

## 08 - 4 데이터베이스 및 컬렉션 생성하기

- `> use nodejs'
- `> show dbs'

- `> db.createCollection('users')'
- `> db.createCollection('comments')'

- '> show collections'
