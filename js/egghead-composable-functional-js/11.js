// 11 Delay Evaluation with LazyBox

const { Box } = require('./lib');

const LazyBox = g =>
({
  fold: f => f(g()),
  map: f => LazyBox(() => f(g()))
})

const result = LazyBox(() =>'  64 ')
               .map(abba => abba.trim())
               .map(trimmed => new Number(trimmed))
               .map(number => number + 1)
               .map(x => String.fromCharCode(x))
               .fold(x => x.toLowerCase())

console.log(result) // a
