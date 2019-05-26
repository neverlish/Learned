// 10 Using the Associative Property in JavaScript Functional Compositions

// Associative Property

const {
  compose,
  scream,
  exclaim,
  repeat
} = require('./shared')

const withExuberance = compose(
  repeat,
  exclaim,
  scream
)

const str = 'I love egghead'

console.log(withExuberance(str)) // I LOVE EGGHEAD! I LOVE EGGHEAD!

const repeatExcitedly = compose(
  repeat,
  exclaim
)

console.log(
  compose(
    repeatExcitedly,
    scream
  )(str)
) // I LOVE EGGHEAD! I LOVE EGGHEAD!

const screamLoudly = compose(
  exclaim,
  scream
)

console.log(
  compose(
    repeat,
    screamLoudly
  )(str)
) // I LOVE EGGHEAD! I LOVE EGGHEAD!