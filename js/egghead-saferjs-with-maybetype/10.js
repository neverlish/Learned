// 10 Compose Functions for Reusability with the Maybe Type

const crocks = require('crocks')
const { Maybe, prop, safe, compose, chain, alt, map, option } = crocks
const { createUrl, isNonEmptyString } = require('./utils')

const article = {
  id: 1,
  name: 'Learn FP with this one weird trick'
}

// const getUrl = obj =>
//   prop('name', obj)
//     .chain(safe(isNonEmptyString))
//     .alt(Maybe.of('Nope'))
//     .map(createUrl)
//     .option('default')

const getSluggableName = compose(
  chain(safe(isNonEmptyString)),
  prop('name')
)

const getUrlOrDefault = compose(
  option('default'),
  map(createUrl),
)

const getUrl = compose(
  // option('default'),
  // map(createUrl),
  getUrlOrDefault,
  // chain(safe(isNonEmptyString)),
  // prop('name'),
  getSluggableName
)

const getUrlOrNope = compose(
  getUrlOrDefault,
  alt(Maybe.of('Nope')),
  getSluggableName
)

const getUrlOrWoops = compose(
  getUrlOrDefault,
  alt(Maybe.of('Woops')),
  getSluggableName
)

const url = getUrl(article)
console.log(url) // https://egghead.io/articles/learn-fp-with-this-one-weird-trick

const url2 = getUrl({}) // default
console.log(url2)

const url3 = getUrlOrNope({})
console.log(url3) // https://egghead.io/articles/nope

const url4 = getUrlOrWoops({})
console.log(url4) // https://egghead.io/articles/woops
