// 05 Identify Side Effects by Comparing Pure and Impure JavaScript Functions

// Pure Functions

// f(x) = x + 1
const f = x => x + 1

// Ex 1 - Global State
const COST_OF_ITEM = 19
const cartTotal = quantity => COST_OF_ITEM * quantity

console.log(cartTotal(2)) // 38
console.log(cartTotal(2)) // 38

// Ex 2 - Same input, different output
const generateID = () => Math.floor(Math.random() * 10000)

console.log(generateID())
console.log(generateID())
console.log(generateID())

const createUser = (name, age) => ({
  id: generateID(),
  name,
  age
})

console.log(createUser('Kyle', 33))
console.log(createUser('Kyle', 33))
console.log(createUser('Kyle', 33))

// Ex 3 - Side Effects #1
let id = 0
const createFoodItem = name => ({
  id: ++id,
  name
})

console.log(createFoodItem('Cheeseburgers'))
console.log(createFoodItem('Fries'))
console.log(createFoodItem('Milkshakes'))
console.log(id)

// Ex 4 - Side Effects #2 - Outside World
const logger = msg => {
  console.log(msg)
}

logger('Hi eggheads')