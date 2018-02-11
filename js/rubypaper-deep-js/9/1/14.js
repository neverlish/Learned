// 9 자바스크립트 표준 - 1 ECMAScript 6 표준 - 14 Symbol 모듈

// Symbol 활용 예

(() => {
  var myObject = {
    [Symbol()]: 'First symbol',
    [Symbol()]: 'Second symbol'
  };
  console.log(myObject); // { [Symbol()]: 'First symbol', [Symbol()]: 'Second symbol' }
  const key = Symbol();
  console.log('typeof key : ' + typeof key); // typeof key : symbol

  myObject[key] = 'New symbol';
  console.log(Object.keys(myObject)); // []
  console.log(Object.getOwnPropertyNames(myObject)); // []
  console.log(Object.getOwnPropertySymbols(myObject)); // [ Symbol(), Symbol(), Symbol() ]
})();

// Symbol 비교와 Symbol.for 함수 예
(() => {
  console.log(Symbol('unikys') === Symbol('unikys')); // false
  console.log(Symbol.for('unikys') === Symbol.for('unikys')); // true
})();
