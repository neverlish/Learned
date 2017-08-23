// 07 Set & WeakSet - 2 WeakSet 으로 효과적으로 객체타입저장하기

// weakset : 참조를 가지고 있는 객체만 저장이 가능하다.
// 객체 형태를 중복없이 저장하려고 할 때 유용하다.

let arr = [1, 2, 3, 4];
let arr2 = [5, 6, 7, 8];
let obj = {arr, arr2};
let ws = new WeakSet();

ws.add(arr);
// ws.add(111); // TypeError: Invalid value used in weak set
// ws.add('111');
// ws.add(null); 
ws.add(function() {});
ws.add(arr2);
ws.add(obj);

arr = null;

console.log(ws);
console.log(ws.has(arr), ws.has(arr2)); // false true
