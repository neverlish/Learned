// 16 You've been using Monads

const { Box } = require('./lib');

/*
httpGet('/user')
.map(user =>
  httpGet(`/comments/${user.id}`)
  .chain(comments =>
    updateDOM(user, comments))) // Task(Task(Task(DOM)))
*/

const join = m =>
  m.chain(x => x)

// join(m.map(join)) == join(join(m))

const m = Box(Box(Box(3)))
const res1 = join(m.map(join)) // Box(3)
const res2 = join(join(m)) // Box(3

console.log(res1, res2)

const m2 = Box('wonder')
const res3 = join(Box(m2)) // Box(wonder)
const res4 = join(m2.map(Box)) // Box(wonder)

console.log(res3, res4)

// join(Box.of(m)) == join(m.map(Box.of))
