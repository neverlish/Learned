// 06 Destructing - 2 Destructing Object

let obj = {
  name: 'crong',
  address: 'Korea',
  age: 10
}

let {name, age} = obj;
console.log(name, age); // crong 10

let {name: myName, age: myAge} = obj;
console.log(myName, myAge); // crong 10
