// prototype 프로퍼티와 [[Prototype]] 링크 구분

// Person 생성자 함수
function Person(name) {
	this.name = name;
}

// foo 객체 생성
var foo = new Person('foo');

console.dir(Person);
console.dir(foo);