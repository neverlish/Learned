// Refactor a Loop in JavaScript to Use Recursion

// function counter(n) {
//   console.log(n)
//   if (n === 10) {
//     return
//   }
//   return counter(n + 1)
// }

// counter(0)

const items = [[1, 2, 3], [4, 5, [6]]]

function findSix(i) {
  let hasSix = 'no!'
  i.forEach(a => {
    if (a === 6) {
      hasSix = 'yes!'
    }
    if (Array.isArray(a)) {
      hasSix = findSix(a)
    }
  })
  return hasSix
}

console.log(findSix(items)) // yes!
