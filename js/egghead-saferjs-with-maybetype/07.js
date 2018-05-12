// 07 Flatten Nested Maybes with `chain`

const propPath = require('crocks/Maybe/propPath')
const { getUser } = require('./service')

const getPostalCode = propPath(['address', 'postalCode'])

getUser(1)
  // .then(res => res.map(getPostalCode)) // Just Just "19123-4567"
  .then(res => res.chain(getPostalCode)) // Just "19123-4567"
  .then(console.log) 
