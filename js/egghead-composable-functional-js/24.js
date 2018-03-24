// 24 Principled type conversions with Natural Transformations

const { Box, Right, Left, fromNullable, first } = require('./lib')
const Task = require('data.task')

// nt(x).map(f) === nt(x.map(f))

const boxToEither = b =>
   b.fold(Right)

const res1 = boxToEither(Box(100)).map(x => x * 2)
const res2 = boxToEither(Box(100).map(x => x * 2))
console.log(res1, res2) // Right(200) Right(200)

const eitherToTask = e =>
  e.fold(Task.rejected, Task.of)

eitherToTask(Right('nightingale'))
.fork(e => console.error('err', e), 
      r => console.log('res', r)) // res nightingale

////

const res3 = first([1,2,3]).map(x => x + 1)
const res4 = first([1,2,3].map(x => x + 1))
console.log(res3, res4) // Right(2) Right(2)
