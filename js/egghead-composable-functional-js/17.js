// 17 Build curried functions

const add = (x, y) => x + y
const inc = y => add(1, y)
const res = inc(2)
console.log(res) // 3

const add2 = x => (y => x + y)
const inc2 = add(1)
const res2 = inc(2)
console.log(res2) // 3

//// 
const modulo = dvr => dvd => dvd % dvr
const isOdd = modulo(2)
const res3 = isOdd(21)
console.log(res3) // 1

const filter = pred => xs => xs.filter(pred)
const getAllOdds = filter(isOdd)
const res4 = getAllOdds([1, 2, 3, 4])
console.log(res4) // [1, 3]

////
const map = f => xs => xs.map(f)

const replace = regex => repl => str =>
  str.replace(regex, repl)

const censor = replace(/[aeiou]/ig)('*')
const censorAll = map(censor)
const res5 = censor('hello world')
const res6 = censorAll(['hello', 'world'])
console.log(res5) // h*ll* w*rld
console.log(res6) // [ 'h*ll*', 'w*rld' ]
