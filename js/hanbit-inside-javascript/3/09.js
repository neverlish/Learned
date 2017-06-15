// 동일한 객체를 참조하는 두 변수 objA와 objB
var objA = {
	val: 40
};
var objB = objA;

console.log(objA.val); // 40
console.log(objB.val); // 40

objB.val = 50;
console.log(objA.val); // 50
console.log(objB.val); // 50