// 프로토타입 객체 변경

// Person() 생성자 함수
function Person(name) {
	this.name = name;
}

console.log(Person.prototype.constructor); // Person(name)

// foo 객체 생성
var foo = new Person('foo');
console.log(foo.country); // undefined

// 디폴트 프로토타입 객체 변경
Person.prototype = {
	country: 'korea'
};
console.log(Person.prototype.constructor); // Object()

// bar 객체 생성
var bar = new Person('bar');
console.log(foo.country); // undefined
console.log(bar.country); // korea
console.log(foo.constructor); // Person(name)
console.log(bar.constructor); // Object()