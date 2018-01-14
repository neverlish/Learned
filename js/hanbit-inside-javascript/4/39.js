// 생성자 함수 방식에서의 프로토타입 체이닝

// Person() 생성자 함수
function Person(name, age, hobby) {
	this.name = name;
	this.age = age;
	this.hobby = hobby;
}

// foo 객체 생성
var foo = new Person('foo', 30, 'tennis');

// 프로토타입 체이닝
console.dir(foo.hasOwnProperty('name')); // true

// Person.prototype 객체 출력
console.dir(Person.prototype);