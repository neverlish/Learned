// 11 Create Factory Functions for Object Composition

const human = {
  type: 'human'
}

const tyler = {
  hair: 'brown',
  height: '6 foot'
}

const sally = {
  hair: 'blonde',
  height: '5 foot 4'
}

Object.setPrototypeOf(tyler, human)
Object.setPrototypeOf(sally, human)

console.log(tyler.type) // human

const createUser = (character, smart = true) => ({
  smart,
  ...character,
  type: 'human'
})

const tyler2 = createUser({
  hair: 'brown',
  height: '6 foot' 
})

const sally2 = createUser({
  hair: 'blonde',
  height: '5 foot 4'
})

console.log(tyler2.type) // human
