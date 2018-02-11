// 9 자바스크립트 표준 - 1 ECMAScript 6 표준 - 9 Map과 Set 기능 추가

// Map과 Set의 활용 예
var map = new Map(),
    key = {name: 'Unikys'};

map.set('Hello', 'World').set('ECMAScript', 6).set(key, 'javascript');
for (let [key, val] of map.entries()) {
  console.log(key + ' = ' + val);
  /*
  Hello = World
  ECMAScript = 6
  [object Object] = javascript
  */
}

var set = new Set();
set.add('Hello').add('World').add('ECMAScript').add('6');

console.log(set.has('ECMAScript')); // true
for (let key of set.values()) {
  console.log(key);
  /*
  Hello
  World
  ECMAScript
  6
  */
}

// WeakMap과 WeakSet 활용 예
var weakSet = new WeakSet(),
    weakMap = new WeakMap(),
    obj = {
      name: 'Unikys'
    },
    val = {
      language: 'javascript'
    };

weakSet.add(obj);
weakMap.set(obj, val);

console.log(weakSet.has(obj)); // true
console.log(weakMap.has(obj)); // true
obj = null;
console.log(weakSet.has(obj)); // false
console.log(weakMap.has(obj)); // false
