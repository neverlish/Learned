// 22 Leapfrogging types with Traversable

const fs = require('fs')
const Task = require('data.task')
const futurize = require('futurize').futurize(Task)
const { List } = require('immutable-ext')

const readFile = futurize(fs.readFile)
const files = ['lib.js', 'config.json']

const res = files.map(fn => readFile(fn, 'utf-8'))
console.log(res)
/*
[ Task { fork: [Function], cleanup: [Function] },
  Task { fork: [Function], cleanup: [Function] } ]
*/

const files2 = List(['lib.js', 'config.json'])
files2.traverse(Task.of, fn => readFile(fn, 'utf-8'))
.fork(console.error, console.log)
/*
List [ "const Box = x =>\n({\n  map: f => Box(f(x)),\n  fold: f => f(x),\n  chain: f => f(x),\n  ap: b2 => b2.map(x),\n  inspect: () => `Box(${x})`\n})\n\nconst Right = x =>\n({\n  ap: b2 => b2.map(x),\n  chain: f => f(x),\n  map: f => Right(f(x)),\n  fold: (f, g) => g(x),\n  inspect: () => `Right(${x})`\n})\n\nconst Left = x =>\n({\n  chain: f => Left(x),\n  map: f => Left(x),\n  fold: (f, g) => f(x),\n  inspect: () => `Left(${x})`\n})\n\nconst fromNullable = x =>\n  x != null ? Right(x) : Left(null)\n\nconst tryCatch = f => {\n  try {\n    return Right(f())\n  } catch(e) {\n    return Left(e)\n  }\n}\n\nconst Sum = x => \n({\n  x,\n  concat: ({x: y}) => \n    Sum(x + y),\n  inspect: () =>\n    `Sum(${x})`\n})\n\nSum.empty = () => Sum(0)\n\nconst All = x =>\n({\n  x,\n  concat: ({x: y}) =>\n    All(x && y),\n  inspect: () =>\n    `All(${x})`\n})\n\nAll.empty = () => All(true)\n\nconst First = x =>\n({\n  x,\n  fold: f =>f(x),\n  concat: o =>\n    x.isLeft ? o : First(x),\n  inspect: () =>\n   `First(${x})`\n})\n\nFirst.empty = () => First(Left())\n\nconst liftA2 = (f, fx, fy) =>\n  fx.map(f).ap(fy)\n  \nmodule.exports = {\n  Box,\n  Right,\n  Left,\n  fromNullable,\n  tryCatch,\n  Sum,\n  All,\n  First,\n  liftA2,\n}\n", "{\"port\": 8888}\n" ]
*/
