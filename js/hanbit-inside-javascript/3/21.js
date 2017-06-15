// 배열의 프로퍼티 열기

// 배열 생성
var arr = ['zero', 'one', 'two'];
console.log(arr.length); // (출력값) 3

// 프로퍼티 동적 추가
arr.color = 'blue';
arr.name = 'number_array';
console.log(arr.length); // (출력값) 3

// 배열 원소 추가
arr[3] = 'red';
console.log(arr.length); // (출력값) 4

// 배열 객체 출력
console.dir(arr); // [ 'zero', 'one', 'two', 'red', color: 'blue', name: 'number_array' ]

for (var prop in arr) {
	console.log(prop, arr[prop]);
}

for (var i=0; i<arr.length; i++) {
	console.log(i, arr[i]);
}