// 06 Safely Access Nested Object Properties with `propPath`

const propPath = require('crocks/Maybe/propPath')

const user = {
  username: 'tester',
  email: 'test@gmail.com',
  address: {
    street: '111 E. West St',
    city: 'Anywhere',
    state: 'PA',
    postalCode: '19123-4567'
  }
}

// const zip = user.address.postalCode || 'not available'
const getPostalCode = propPath(['address', 'postalCode'])
const zip = 
  // propPath(['address', 'postalCode'], user)
  getPostalCode(user)
  .option('not available')
console.log(zip) // not available
