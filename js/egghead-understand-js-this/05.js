// 05 Specify this using .call() or .apply()

function sayHi() {
	console.log(`Hi, my name is ${this.firstName}!`);
}

const person = {
	firstName: 'Jane',
	lastName: 'Doe'
};

sayHi.call(person); // Hi, my name is Jane!
sayHi.apply(person); // Hi, my name is Jane!

const numbers = [10, 20, 30, 40, 50];
const slice1 = numbers.slice(1, 4);
const slice2 = numbers.slice.call(numbers, 1, 4);
const slice3 = numbers.slice.apply(numbers, [1, 4]);

console.log(slice1); // [ 20, 30, 40 ]
console.log(slice2); // [ 20, 30, 40 ]
console.log(slice3); // [ 20, 30, 40 ]

// (c)all => (c)omma
// (a)pply => (a)rray

function func() {
	console.log(this === global);
}

func.call(null); // true
func.call(undefined); // true

func.apply(null); // true
func.apply(undefined); // true

function func2() {
	"use strict";
	console.log(this === global);
}

func2.call(null); // false
func2.call(undefined); // false

func2.apply(null); // false
func2.apply(undefined); // false