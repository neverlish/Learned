// 07 Set & WeakSet - 1 Set 으로 유니크한 배열만들기

let mySet = new Set();
console.log(toString.call(mySet));

// set : 중복 없이 유일한 값을 저장하려고 할 때. 이미 존재하는지 체크할 때 유용.

mySet.add('crong');
mySet.add('hary');
mySet.add('crong');

console.log(mySet.has('crong')); // true

mySet.delete('crong');

mySet.forEach(function(v) {
  console.log(v)
})


