// 9 자바스크립트 표준 - 1 ECMAScript 6 표준 - 8 iterator와 for-of 기능

// 피보나치 수열의 iterator와 for-of 예
var fibonacci = {
  maxStep: 20,
  [Symbol.iterator]() {
    var previous = 0, current = 1, step = 0, maxStep = this.maxStep;
    return {
      next() {
        [previous, current] = [current, previous + current];
        return {done: step++ >= maxStep, value: current};
      }
    };
  }
};

for (var fibonacciNumber of fibonacci) {
  console.log(fibonacciNumber);
}

// function*와 yield 키워드 예
var fibonacci = {
  maxStep: 20,
  *[Symbol.iterator]() {
    var previous = 0, current = 1, step = 0, maxStep = this.maxStep;
    while(step++ < maxStep) {
      [previous, current] = [current, previous + current];
      yield current;
    }
  }
};

for (var fibonacciNumber of fibonacci) {
  console.log(fibonacciNumber);
}

// iterator 객체 생성 예
var iterFibonacci = function* (maxStep) {
  var previous = 0, current = 1, step = 0;
  while (step++ < maxStep) {
    [previous, current] = [current, previous + current];
    yield current;
  }
};

for (var fibonacciNumber of iterFibonacci(20)) {
  console.log(fibonacciNumber);
}

// iter 객체와 destructing 활용 예
var fibonacciResult = [...iterFibonacci(20)];
var [n1, n2, n3, n4, n5, ...rest] = iterFibonacci(20);

// iter 객체의 yield 키워드 활용 예
var myObject = {};
myObject[Symbol.iterator] = function* () {
  yield '1';
  yield* [2, 3];
  yield* '45';
  yield* innerGenerator();
  yield* '9';
}

function* innerGenerator() {
  yield 6;
  yield* new Set(['7', '8']);
}

console.log([...myObject]); // [ '1', 2, 3, '4', '5', 6, '7', '8', '9' ]

// iterator 객체를 통한 비동기 요청 흐름제어 예
function getDOM() {
  var xhr = new XMLHttpRequest();
  xhr.open('/fetchDOM');
  xhr.onload = function() {
    xhrRequests.next(xhr.responseText);
  }
  xhr.send();
}

function getData() {
  var xhr = new XMLHttpRequest();
  xhr.open('/fetchData');
  xhr.onload = function() {
    xhrRequests.next(xhr.responseText);
  }
  xhr.send();
}

function manipulateDOM(dom, data) {
  // Fix DOM
}

var xhrRequests = function* () {
  var dom, data;
  dom = yield getDOM();
  data = yield getData();
  yield manipulateDOM(dom, data);
}
