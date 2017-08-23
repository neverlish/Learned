// 11 Function - 4 rest parameters

function checkNum() {
  const argArray = Array.prototype.slice.call(arguments);
  // console.log(arguments);
  // console.log(toString.call(arguments)); // [object Arguments]
  const result = argArray.every((v) => typeof v === 'number');
  console.log(result);
}

const num = checkNum(10, 2, '55'); // false
const num2 = checkNum(10, 2, 3, 4, 5, 55); // true
const num3 = checkNum(10, 2, 3, 4, 5, false); // false

function checkNum2(...argArray) {
  const result = argArray.every((v) => typeof v === 'number');
  console.log(result);
}

const num4 = checkNum2(10, 2, '55'); // false
const num5 = checkNum2(10, 2, 3, 4, 5, 55); // true
const num6 = checkNum2(10, 2, 3, 4, 5, false); // false
