// 배열과 객체의 유사점과 차이점

// colorsArray 배열
var colorsArray = ['orange', 'yellow', 'green'];
console.log(colorsArray[0]); // (출력값) orange
console.log(colorsArray[1]); // (출력값) yellow
console.log(colorsArray[2]); // (출력값) green

// colorsObj 객체
var colorsObj = {
	'0': 'orange',
	'1': 'yellow',
	'2': 'green'
};
console.log(colorsObj[0]); // (출력값) orange
console.log(colorsObj[1]); // (출력값) yellow
console.log(colorsObj[2]); // (출력값) green

// typeof 연산자 비교
console.log(typeof colorsArray); // (출력값) object (not array)
console.log(typeof colorsObj); // (출력값) object

// length 프로퍼티
console.log(colorsArray.length); // (출력값) 3
console.log(colorsObj.length); // (출력값) undefined

// 배열 표준 메서드
colorsArray.push('red'); // ['orange', 'yellow', 'green', 'red']
colorsObj.push('red'); // Uncaught TypeError: Object #<Object> has no method 'push'
