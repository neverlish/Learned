// 25 Apply Natural Transformations in everyday work

const { List } = require('immutable-ext')
const { first, Right, Left, box } = require('./lib')
const Task = require('data.task')

const res = List(['hello', 'world'])
            .chain(x => List(x.split('')))

console.log(res) // List [ "h", "e", "l", "l", "o", "w", "o", "r", "l", "d" ]

////

const largeNumbers = xs =>
  xs.filter(x => x > 100)

const larger = x =>
  x * 2

const app = xs =>
  first(largeNumbers(xs).map(larger))

console.log(app([2, 400, 5, 1000])) // Right(800)

////

const fake = id =>
  ({id: id, name: 'user1', best_friend_id: id + 1})

const Db = ({
  find: id =>
    new Task((rej, res) => 
      res(id > 2 ? Right(fake(id)) : Left('not found')))
})

const eitherToTask = e =>
  e.fold(Task.rejected, Task.of)

Db.find(3)
.chain(eitherToTask)
.chain(user =>
  Db.find(user.best_friend_id))
.chain(eitherToTask)
.fork(e => console.error(e), 
      r => console.log(r)) // { id: 4, name: 'user1', best_friend_id: 5 }
