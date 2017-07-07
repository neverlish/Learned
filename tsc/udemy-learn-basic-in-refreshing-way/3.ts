// tsc -p . 

var someVal = null;
// Object is possibly 'null'.
console.log(someVal.foo);

var foo: Function;
//  Variable 'foo' is used before being assigned.
foo();

function sum(a: number, b: number) {
  return a+b;
}

console.log(sum(1,2));
console.log(sum(1, null)); 
//  Argument of type 'null' is not assignable to parameter of type 'number'.
console.log(sum(1, 'a')); 
// Argument of type '"a"' is not assignable to parameter of type 'number'.
console.log(sum(1)); 
// Expected 2 arguments, but got 1.

function power(n: number) {
  console.log('the power of ' + n + ' is ' + n*n);
}
var count: number = 3;
power(count); // the power of 3 is 9
power('3'); // Argument of type '"3"' is not assignable to parameter of type 'number'.
