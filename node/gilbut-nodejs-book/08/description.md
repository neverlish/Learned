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

## 08 - 5 CRUD 작업하기

#### Create(생성)

- `> db.users.save({ name: 'zero', age: 24, married: false, comment: '안녕하세요. 간단히 몽고디비 사용 방법에 대해 알아봅시다.', createdAt: new Date() })`
- `> db.users.save({ name: 'nero', age: 32, married: true, comment: '안녕하세요. zero 친구 nero입니다.', createdAt: new Date() })`

- `> db.users.find({ name: 'zero' }, { _id: 1 })`

- `> db.comments.save({ commenter: ObjectId('USER_ID'), comment: '안녕하세요. zero의 댓글입니다.', createdAt: new Date() })`
