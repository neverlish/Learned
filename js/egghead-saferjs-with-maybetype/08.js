// 08 Recover from a Nothing with the `alt` method

const crocks = require('crocks')
const { and, compose, isEmpty, isString, Maybe, not, prop, safe } = crocks
const { join, split, toLower } = require('ramda')

const isNonEmptyString = and(not(isEmpty), isString)
const createUrlString = compose(join('-'), split(' '), toLower)
const createUrl = slug => `https://egghead.io/articles/${slug}`

const article = {
  id: 1,
  name: 'Learn FP with this one weird trick'
}

const createUrlFromName = compose(createUrl, createUrlString)
const getArticleName = obj => prop('name', obj)
  .chain(safe(isNonEmptyString))
  .alt(Maybe.of('Page Not Found'))

const url = getArticleName(article) // Just "Learn FP with this one weird trick"
  // .map(createUrlString)
  // .map(createUrl) 
  .map(createUrlFromName)
  // https://egghead.io/articles/learn-fp-with-this-one-weird-trick
  // https://egghead.io/articles/page-not-found
  .option('default') 
console.log(url)
