var Users = [{name: '소녀시대', age: 20}, {name: '걸스데이', age: 22}];
console.log('unshift() 호출 전 배열 요소의 수 : %d', Users.length);

Users.unshift({name: '티아라', age: 23});
console.log('unshift() 호출 후 배열 요소의 수 : %d', Users.length);

Users.shift();
console.log('shift() 호출 후 배열 요소의 수 : %d', Users.length);
