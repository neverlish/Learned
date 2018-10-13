// 13 Replicate JavaScript Constructor Inheritance with Simple Objects (OLOO)

// function House(color) {
//   this.color = color
// }

// const myHouse = new House('white')

const house = {
  set houseColor(color) {
    this.color = color
  }
}

const myHouse = Object.create(house)

console.log(myHouse.houseColor = 'white') // white

console.log(myHouse) // { color: 'white' }
