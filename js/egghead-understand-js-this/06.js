// 06 Hard-Bind a Function's this Value with the .bind() Method

const person = {
	firstName: 'John',
	sayHi() {
		console.log(`Hi, my name is ${this.firstName}!`);
	}	
};

setTimeout(person.sayHi.bind(person), 1000); // Hi, my name is John!

const greet = person.sayHi.bind(person);
greet(); // Hi, my name is John!

const otherPerson = {
	firstName: 'Jane'
};

greet.call(otherPerson); // Hi, my name is John!

////////

Function.prototype.bind = function(thisArg, ...fixedArgs) {
	const func = this;
	return function(...args) {
		return func.apply(thisArg, [...fixedArgs, ...args]);
	}
}