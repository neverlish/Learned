const Box = x =>
({
  map: f => Box(f(x)),
  fold: f => f(x),
  chain: f => f(x),
  inspect: () => `Box(${x})`
})

const Right = x =>
({
  chain: f => f(x),
  map: f => Right(f(x)),
  fold: (f, g) => g(x),
  inspect: () => `Right(${x})`
})

const Left = x =>
({
  chain: f => Left(x),
  map: f => Left(x),
  fold: (f, g) => f(x),
  inspect: () => `Left(${x})`
})

const fromNullable = x =>
  x != null ? Right(x) : Left(null)

const tryCatch = f => {
  try {
    return Right(f())
  } catch(e) {
    return Left(e)
  }
}

const Sum = x => 
({
  x,
  concat: ({x: y}) => 
    Sum(x + y),
  inspect: () =>
    `Sum(${x})`
})

Sum.empty = () => Sum(0)

const All = x =>
({
  x,
  concat: ({x: y}) =>
    All(x && y),
  inspect: () =>
    `All(${x})`
})

All.empty = () => All(true)

const First = x =>
({
  x,
  fold: f => f(x),
  concat: o =>
    x.isLeft ? o : First(x),
  inspect: () =>
    `First(${x})`
})

First.empty = () => First(Left())

const Pair = (x, y) =>
({
  x,
  y,
  concat: ({x: x1, y: y1}) =>
    Pair(x.concat(x1), y.concat(y1))
})
  
module.exports = {
  Box,
  Right,
  Left,
  fromNullable,
  tryCatch,
  Sum,
  All,
  First,
  Pair,
}
