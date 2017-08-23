// 08 Map & WeakMap - 1 Map & WeakMap 추가정보를 담은 객체저장하기

// Array -> set, weakset
// Object -> map, weakmap

// map은 key/value

let wm = new WeakMap();
let myfun = function() {};

// 이 함수가 얼마나 실행됐지? 를 알려고 할 때.

wm.set(myfun, 0);

console.log(wm); // WeakMap {f => 1}

for (let i=0; i<10; i++) {
  count = wm.get(myfun); // get value
  count++;
  wm.set(myfun, count);
}

console.log(wm); // WeakMap {f => 10}

myfun = null
console.log(wm.get(myfun)); // undefined
console.log(wm.has(myfun)); // false
