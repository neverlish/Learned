// 04 Refactor a Function to Use Currying in JavaScript

// Curryinig

function add(x) {
  return function (y) {
    return x + y
  }
}

const addThree = add(3)
console.log(addThree(4)) // 7
console.log(addThree(6)) // 9
console.log(addThree(56)) // 59

const add2 = x => y => x + y

// Arity

// 1 = unary
// 2 = binary
// 3 = ternary
// 4 = quaternary