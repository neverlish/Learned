const SPECIALS = '!@#$%^&*()_+{}:"<>?\|[]\',./`~'
const LOWERCASE = 'abcdefghijklmnopqrstuvwxyz'
const UPPERCASE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const NUMBERS = '0123456789'
const ALL = `${SPECIALS}${LOWERCASE}${UPPERCASE}${NUMBERS}`

const getIterable = (length) => Array.from({length}, (_, index) => index + 1)

const pick = (set, min, max) => {
  let length = min
  if (typeof max != 'undefined') {
    length += Math.floor(Math.random() * (max - min))
  }
  return getIterable(length).map(() => (
    set.charAt(Math.floor(Math.random() * set.length))
  )).join('')
}

const shuffle = (set) => {
  let array = set.split('')
  let length = array.length
  let iterable = getIterable(length).reverse()
  let shuffled = iterable.reduce((acc, value, index) => {
    let randomIndex = Math.floor(Math.random() * value)
    let temp = acc[value - 1]
    acc[value - 1] = acc[randomIndex]
    acc[randomIndex] = temp
    return acc
  }, [...array])
  return shuffled.join('')
}

module.exports = () => {
  let password = pick(SPECIALS, 1)
    + pick(LOWERCASE, 1)
    + pick(NUMBERS, 1)
    + pick(UPPERCASE, 1)
    + pick(ALL, 4, 12)
  return shuffle(password)
}
