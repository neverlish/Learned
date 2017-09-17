// 05 Object - 1 간단히 객체생성하기

/*
const name = 'crong';
const age = 33;
const obj = {
  name: name,
  age: age
}
console.log(obj);
*/

function getObj() {
  const name = 'crong';
  const getName = function() {
    return name;
  }
  const setName = function(newname) {
    name = newname;
  }
  const printName = function() {
    console.log(name);
  }
  // return {
  //   getName: getName,
  //   setName: setName
  // }
  return {getName, setName, name}
}

var obj = getObj();
console.log(obj); // { getName: [Function: getName], setName: [Function: setName], name: 'crong' }
console.log(obj.getName()); // crong

/*
const data = {
  name,
  getName() {
    
  },
  age
}
*/
