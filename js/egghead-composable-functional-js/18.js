// 18 Applicative Functors for multiple arguments

// F(x).map(f) == F(f).map(F(x))

const { Box, liftA2} = require('./lib');
const res = Box(x => x + 1).ap(Box(2))
console.log(res) // Box(3)

const res2 = Box(x => y => x + y).ap(Box(2)).ap(Box(3))
console.log(res2) // Box(5)

const add = x => y => x + y

const res3 = Box(add).ap(Box(2)).ap(Box(4))

const res4 = liftA2(add, Box(2), Box(4))
console.log(res3) // Box(6)
console.log(res4) // Box(6)

const liftA3 = (f, fx, fy, fz) =>
  fx.map(f).ap(fy).ap(fz)
