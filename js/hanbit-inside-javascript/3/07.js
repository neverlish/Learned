// 객체의 프로퍼티 접근하기

// 객체 리터럴 방식으로 foo 객체 생성
var foo = {
	name: 'foo',
	major: 'computer science'
};

// 객체 프로퍼티 읽기
console.log(foo.name); // (출력값) foo
console.log(foo['name']); // (출력값) foo
console.log(foo.nickname); // (출력값) undefined

// 객체 프로퍼티 갱신
foo.major = 'electronics engineering';
console.log(foo.major); // (출력값) electronics engineering
console.log(foo['major']); // (출력값) electronics engineering

// 객체 플퍼티 동적 생성
foo.age = 30;
console.log(foo.age); // (출력값) 30

// 대괄호 표기법만을 사용해야 할 경우
foo['full-name'] = 'foo bar';
console.log(foo['full-name']); // (출력값) foo bar
console.log(foo.full-name); // (출력값) NaN
console.log(foo.full); // (출력값) undefined
console.log(name); // (출력값) undefined