// 11 Function - 3 function default parameters

function sum(value, size={value:1}) {
  // size = size || 1;
  return value * size.value;
}

console.log(sum(3, {value:3})); // 9
console.log(sum(3)); // 3
console.log(sum(3, {value:0})); // 0
