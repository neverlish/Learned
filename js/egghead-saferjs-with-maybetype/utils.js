const crocks = require('crocks')
const {
  and,
  compose,
  identity,
  isEmpty,
  isString,
  Maybe,
  not,
  prop,
  safe
} = crocks
const { join, split, toLower } = require('ramda')
//#endregion

const inc = n => n + 1

const dbl = n => n * 2

const toUpper = s => s.toUpperCase()

const isNonEmptyString = and(not(isEmpty), isString)
const createUrlSlug = compose(join('-'), split(' '), toLower)
const buildUrl = slug => `https://egghead.io/articles/${slug}`
const createUrl = compose(buildUrl, createUrlSlug)
const getArticleName = obj => prop('name', obj).chain(safe(isNonEmptyString))

const getDefaultPageName = abFlag => () => (abFlag ? 'Page Not Found' : 'Uh Oh')
const getDefaultPageUrl = abFlag => () =>
  abFlag
    ? 'https://egghead.io/articles/not-found'
    : 'https://egghead.io/articles/nope'

module.exports = {
  dbl,
  inc,
  toUpper,
  isNonEmptyString,
  createUrl,
  getDefaultPageName,
  getDefaultPageUrl,
  getArticleName
}
