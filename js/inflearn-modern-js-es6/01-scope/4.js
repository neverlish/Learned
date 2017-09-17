// 01 scope - 4 const 특성과 immutable array

function home() {
  const list = ['apple', 'orange', 'watermelon'];
  // list = 'sdsdf'; // TypeError: Assignment to constant variable.
  list.push('banana');
  console.log(list);
}
// const 를 사용하더라도 배열과 오브젝트의 값을 변경하는 것은 가능하다.
home();

// immutable array를 어떻게 만들지?
const list = ['apple', 'orange', 'watermelon'];
list2 = [].concat(list, 'banana');
console.log(list === list2);
