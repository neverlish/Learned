// 객체 리터럴 방식에서의 프로토타입 체이닝

var myObject = {
	name: 'foo',
	sayName: function() {
		console.log('My Name is ' + this.name);
	}
};

myObject.sayName();
console.log(myObject.hasOwnProperty('name')); // true
console.log(myObject.hasOwnProperty('nickName')); // false
myObject.sayNickName(); // Uncaught TypeError: Object #<Object> has no method 'sayNickName'