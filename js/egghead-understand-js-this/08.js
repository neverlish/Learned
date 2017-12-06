// 08 this in Class Bodies

class Person {
	constructor(firstName, lastName) {
		this.firstName = firstName;
		this.lastName = lastName;
	}

	sayHi() {
		console.log(`Hi, my name is ${this.firstName}`);
	}
}

const person = new Person('John', 'Doe');
person.sayHi(); // Hi, my name is John

const greet = person.sayHi; // 
// greet(); // TypeError: Cannot read property 'firstName' of undefined

const greet2 = person.sayHi.bind(this);
greet2(); // Hi, my name is undefined

//////

class Person2 {
	constructor(firstName, lastName) {
		this.firstName = firstName;
		this.lastName = lastName;

		this.sayHi = this.sayHi.bind(this);
	}

	sayHi() {
		console.log(`Hi, my name is ${this.firstName}`);
	}
}

const person2 = new Person2('John', 'Doe');
const greet3 = person2.sayHi;
greet3(); // Hi, my name is John
