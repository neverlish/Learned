// apply() 메서드를 이용한 명시적인 this 바인딩

// 생성자 함수
function Person(name, age, gender) {
	this.name = name;
	this.age = age;
	this.gender = gender;
}

// foo 빈 객체 생성
var foo = {};

// apply() 메서드 호출
Person.apply(foo, ['foo', 30, 'man']);
console.dir(foo);