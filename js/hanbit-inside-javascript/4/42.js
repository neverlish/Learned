// 프로토타입 메서드와 this 바인딩

// Person() 생성자 함수
function Person(name) {
	this.name = name;
}

// getName() 프로토타입 메서드
Person.prototype.getName = function() {
	return this.name;
};

// foo 객체 생성
var foo = new Person('foo');

console.log(foo.getName()); // (출력값) foo

// Person.prototype 객체에 name 프로퍼타 동적 추가
Person.prototype.name = 'person';

console.log(Person.prototype.getName()); // (출력값) person