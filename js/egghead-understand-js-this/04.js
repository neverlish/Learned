// 04 this in Method Calls

function sayHi() {
	console.log(`Hi, my name is ${this.firstName}!`);
}

const person = {
	firstName: 'John',	
}

person.sayHi = sayHi;
person.sayHi(); // Hi, my name is John!


//////

const greet = person.sayHi;
greet(); // Hi, my name is undefined!

setTimeout(person.sayHi, 1000); // Hi, my name is undefined!

setTimeout(function() {
	person.sayHi(); // 
}, 1000);

setTimeout(person.sayHi.bind(person), 1000); // Hi, my name is John!
