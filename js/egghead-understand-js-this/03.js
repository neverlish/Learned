// 03 this in Constructor Calls

function Person(firstName, lastName) {
	console.log(this); // Person {}
	this.firstName = firstName;
	console.log(this); // Person { firstName: 'Jane' }
	this.lastName = lastName;
	console.log(this); // Person { firstName: 'Jane', lastName: 'Doe' }

	return this;
}

const person = new Person('Jane', 'Doe');
console.log(person); // Person { firstName: 'Jane', lastName: 'Doe' }

function Person2(firstName, lastName) {
	this.firstName = firstName;
	this.lastName = lastName;
	return {
		firstName: 'John',
		lastName: 'Roe'
	};
}

const person2 = new Person2('Jane', 'Doe');
console.log(person2); // { firstName: 'John', lastName: 'Roe' }

function Person3(firstName, lastName) {
	this.firstName = firstName;
	this.lastName = lastName;
	return new Proxy(this, {
		get(target, name) {

		}
	});
}