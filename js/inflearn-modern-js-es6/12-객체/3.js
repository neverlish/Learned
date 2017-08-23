// 12 객체 - 3 Object assign 으로 Immutable 객체만들기

const previousObj = {
  name: 'crong',
  lastTime: '11:20'
}

const myHealth = Object.assign({}, previousObj, {});

console.log(myHealth); // { name: 'crong', lastTime: '11:20' }
console.log(myHealth === previousObj); // false

const myHealth2 = Object.assign({}, previousObj, {
  'name': 'honux',
  'age': 99
});

console.log(myHealth2); // { name: 'honux', lastTime: '11:20', age: 99 }
console.log(myHealth2 == previousObj); // false

