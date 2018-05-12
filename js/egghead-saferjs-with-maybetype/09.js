// 09 Recover from a Nothing with the `coalesce` Method

const Maybe = require('crocks/Maybe')
const { createUrl, getDefaultPageName, getArticleName } = require('./utils')

const article = {
  id: 1,
  name: 'Learn FP with this one weird trick'
}

const abFlag = true
const getDefaultFromNothing = getDefaultPageName(abFlag)

const url = getArticleName(article)
  // .alt(Maybe.of('Page Not Found'))
  // .map(createUrl)
  .coalesce(
    getDefaultFromNothing,
    createUrl
  )
  .option('default')

console.log(url) // https://egghead.io/articles/learn-fp-with-this-one-weird-trick
