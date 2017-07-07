var someVal = null;
console.log(someVal.foo); // error

var foo;

foo(); // not the function


function sum(a,b) {
  return a+b;
}

console.log(sum(1,2)); // okay
console.log(sum(1, null)); // 1
console.log(sum(1, 'a')) // 1a 
console.log(sum(1)); // NaN
