// 11 Debug Functional Compositions with a Logging Side Effect in JavaScript

// Debugging Compositions

const {
  compose,
  map,
  split,
  join,
  lowerCase
} = require('./shared')

const bookTitles = [
  'The Culture Code',
  'Designing Your Life',
  'Algorithms to Live By'
]

const trace = msg => x => (console.log(msg, x), x)

const slugify = compose(
  // map(join('-')),
  // trace('after split'),
  // map(split(' ')),
  // trace('after lowercase'),
  // map(lowerCase),
  // trace('before lowercase')
  map(
    compose(
      join('-'),
      split(' '),
      lowerCase
    )
  )
)

const slugs = slugify(bookTitles)

console.log(slugs)
/*
[ 'the-culture-code',
  'designing-your-life',
  'algorithms-to-live-by' ]
*/