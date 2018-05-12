// 12 Make your own functions safer by lifting them into a Maybe context

const crocks = require('crocks')
const { isNumber, safe, safeLift } = crocks
const { dbl } = require('./utils')

const input = 2
// const safeDbl = n => safe(isNumber, n).map(dbl)
const safeDbl = safeLift(isNumber, dbl)

safeDbl(input).option(0) // 4
