// 03 Array - 3 spread operator - 몇가지 활용

let pre = [100, 200, 'hello', null];

let newData = [0, 1, 2, 3, ...pre, 4];

console.log(newData); // [ 0, 1, 2, 3, 100, 200, 'hello', null, 4 ]

function sum(a, b, c) {
  return a+b+c;
}

let pre2 = [100, 200, 300];
console.log(sum.apply(null, pre2)); // 600
console.log(sum(...pre2)); // 600
