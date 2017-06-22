// 생성자 함수에서 명시적으로 객체를 리턴했을 경우

// Person() 생성자 함수
function Person(name, age, gender) {
	this.name = name;
	this.age = age;
	this.gender = gender;

	// 명시적으로 다른 객체 반환
	return {name: 'bar', age: 20, gender: 'woman'};
}

var foo = new Person('foo', 30, 'man');
console.dir(foo);