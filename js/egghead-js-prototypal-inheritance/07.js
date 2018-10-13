// 07 Compose Objects with Object.assign to Create a Direct Copy

const parent = {
  hair: 'brown',
  heightInInches() {
    return this.height * 12
  }
}

const child = Object.create(parent)

child.height = 6

console.log(child.heightInInches()) // 72

parent.heightInInches = () => true

console.log(child.heightInInches()) // true

const parent2 = {
  hair: 'brown',
  heightInInches() {
    return this.height * 12
  }
}

const child2 = Object.assign({ height: 6}, parent2)

child2.height = 6

console.log(child2.heightInInches()) // 72

parent.heightInInches = () => true

console.log(child2.heightInInches()) // 72
