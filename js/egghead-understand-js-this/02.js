// 02 this in Function Calls

// function func() {
// 	console.log(this === global); // true
// }

// func();

/////////

// "use strict";

// function func() {
// 	console.log(this === undefined); // true
// }

// func();

// function func() {
// 	"use strict";
// 	console.log(this === undefined); // true
// }

// func();

//////

// function Person(firstName, lastName) {
// 	this.firstName = firstName;
// 	this.lastName = lastName;
// }

// const person = Person('Jane', 'Doe');
// console.log(person); // undefined
// console.log(global.firstName); // Jane
// console.log(global.lastName); // Doe

"use strict";

function Person(firstName, lastName) {
	this.firstName = firstName; 
	this.lastName = lastName;
}

// const person = Person('Jane', 'Doe'); // // TypeError: Cannot set property 'firstName' of undefined

const person = new Person('Jane', 'Doe');
console.log(person); // Person { firstName: 'Jane', lastName: 'Doe' }
console.log(global.firstName); // undefined
console.log(global.lastName); // undefined