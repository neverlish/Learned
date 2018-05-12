// 05 Safely Access Object Properties with `prop`

const prop = require('crocks/Maybe/prop')
// const safe = require('crocks/Maybe/safe')
// const { compose, isNil, not } = require('ramda')
const { inc } = require('./utils')

// const isNotNil = compose(not, isNil)

// const qs = { page: 2, pageSize: 10, totalPages: 203 }
const qs = { pageSize: 10, totalPages: 203 }

// const prop = (propName, obj) => safe(isNotNil, obj[propName])

// const page = safe(isNotNil, qs.page)
const safePage = prop('page')
// const page = prop('page', qs)
const page = safePage(qs)
const nextPage = page.map(inc).option(1)
console.log(nextPage) // 1
