// 09 Assign and Access Methods of a JavaScript Class with Static Properties

class Food {
  isHealthyFunc() {
    return true
  }

  static isHealthy() {
    return true
  }

  static canBeEaten() {
    return Food.isHealthy()
  }
}

// console.log(Food.isHealthyFunc()) // Food.isHealthy is not a function
console.log(Food.isHealthy()) // true
console.log(Food.canBeEaten()) // true

function Food2() {

}

Food2.isHealthy = () => true
