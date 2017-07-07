// Animal
class Animal {
  constructor(protected type: string) {

  }

  static isAnimal(instance: any, type: string) {
    if (!Animal.prototype.isPrototypeOf(instance)) {
      return false;
    }
    return type ? instance.type === type : true;
  }
}

// Dog
class Dog extends Animal {
  constructor(public name: string, public breed: string) {
    super('dog')
  }

  bark(): void {
    console.log('ruff, ruff');
  }

  print() {
    console.log('The dog ' + this.name + ' is a ' + this.breed);
  }

  static isDog(instance: any) {
    return Animal.isAnimal(instance, 'dog');
  }
}

// Usage
let sparkie = new Dog('Sparkie', 'Border Collie');
console.log(sparkie.name); // Sparkie
console.log(sparkie.breed); // Border Collie
sparkie.bark(); // ruff, ruff
sparkie.print(); // The dog Sparkie is a Border Collie
console.log(Dog.isDog(sparkie));
