// 유사 배열 객체에서 apply()를 활용한 배열 메서드 호출
var arr = ['bar'];
var obj = { name: 'foo', length: 1 };

arr.push('baz');
console.log(arr); // (출력값) ['bar', 'baz']

Array.prototype.push.apply(obj, ['baz']);
console.log(obj); // (출력값) {'1': 'baz', name: 'foo', length: 2}