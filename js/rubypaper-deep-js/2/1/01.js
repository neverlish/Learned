// 2 자바스크립트의 스코프와 클로저 - 1 스코프 - 01 스코프의 생성

// for-loop 블록 스코프 시험
for (var i = 0; i < 10; i++) {
	var total = (total || 0) + i;
	var last = i;
	if (total > 16) {
		break;
	}
}

console.log(typeof total !== 'undefined'); // true
console.log(typeof last !== 'undefined'); // true
console.log(typeof i !== 'undefined'); // true
console.log('total === ' + total + ', last === ' + last); // total === 21, last === 6

//// function 구문의 스코프 생성

// function 블록 스코프 시험
function foo() {
	var b = 'Can you access me?';
}
console.log(typeof b === 'undefined'); // true

//// catch 구문의 스코프 생성

// catch 블록 스코프 시험
try {
	throw new exception('fake exception');
} catch (err) {
	var test = 'can you see me';
	console.log(err instanceof ReferenceError === true); // true
}
console.log(test === 'can you see me'); // true
console.log(typeof err === 'undefined'); // true

//// with 구문의 스코프 생성

// with 블록 스코프 시험
with ({inScope: "You can't see me"}) {
	var notInScope = 'but you can see me';
	console.log(inScope === "You can't see me");
}
console.log(typeof inScope === 'undefined'); // true
console.log(notInScope === 'but you can see me'); // true

// with 구문을 활용한 문제 해결
