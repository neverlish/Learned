// 26 Isomorphisms and round trip data transformations

const { Box, Right, Left, fromNullable } = require('./lib')
const Task = require('data.task')
const { List, Map } = require('immutable-ext')

// from(to(x)) === x
// to(from(y)) === y

// String ~ [Char]
const Iso = (to, from) =>
({
  to,
  from
})

const chars = Iso(s => s.split(''), c => c.join(''))

const res = chars.from(chars.to('hello world'))
console.log(res) // hello world

const truncate = str =>
  chars.from(chars.to(str).slice(0, 3)).concat('...')

const res2 = truncate('hello world')
console.log(res2) // hel...

// [a] ~ Either null a
const singleton = Iso(e => e.fold(() => [], x => [x]),
                      ([x]) => x ? Right(x) : Left())

const filterEither = (e, pred) =>
  singleton.from(singleton.to(e).filter(pred))

const res3 = filterEither(Right('hello'), x => x.match(/h/ig))
             .map(x => x.toUpperCase())

console.log(res3) // Right(HELLO)

const res4 = filterEither(Right('hello'), x => x.match(/i/ig))
             .map(x => x.toUpperCase())

console.log(res4) // Left(undefined)
