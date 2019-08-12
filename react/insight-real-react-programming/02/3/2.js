// 02 - 3 강화된 함수의 기능

// 02 - 3 - 2 함수를 정의하는 새로운 방법: 화살표 함수

//// 화살표 함수의 사용 예
const add = (a, b) => a + b;
console.log(add(1, 2)); // 3
const add5 = (a) => a + 5;
console.log(add5(1)); // 6
const addAndReturnObject = (a, b) => ({ result: a + b });
console.log(addAndReturnObject(1, 2).result); // 3

//// 화살표 함수의 코드가 여러 줄인 경우
const add2 = (a, b) => {
  if (a <= 0 || b <= 0) {
    throw new Error('must be positive number');
  }
  return a + b;
};

// this와 arguments가 바인딩되지 않는 화살표 함수

//// 화살표 함수에서 나머지 매개변수 사용하기
const printLog = (...rest) => console.log(rest);
printLog(1, 2); // [1, 2]

// 일반 함수에서 this 바인딩 때문에 버그가 발생하는 경우

//// this 바인딩 때문에 버그가 발생한 경우
const obj = {
  value: 1,
  increase: function () {
    this.value++;
  },
};
obj.increase();
console.log(obj.value); // 2

const increase = obj.increase;
increase();
console.log(obj.value); // 2

// 생성자 함수 내부에서 정의된 화살표 함수의 this
function Something() {
  this.value = 1;
  this.increase = () => this.value++;
}

const obj2 = new Something();
obj2.increase();
console.log(obj2.value); // 2

const increase2 = obj2.increase;
increase2();
console.log(obj2.value); // 3

// setInterval 함수 사용 시 this 바인딩 문제
//// setInterval 함수에서 this 객체 사용 시 버그 발생
function Something2() {
  this.value = 1;
  setInterval(function increase() {
    this.value++;
  }, 1000);
}

const obj3 = new Something2();

//// setInterval 함수에서 this 객체를 참조하기 위해 편법 사용
function Something3() {
  this.value = 1;
  var that = this;
  setInterval(function increase() {
    that.value++;
  }, 1000)
}

const obj4 = new Something3();

//// setInterval 함수에서 this 객체를 참조하기 위해 화살표 함수 사용하기
function Something4() {
  this.value = 1;
  setTimeout(() => {
    this.value++;
  }, 1000);
}

const obj5 = new Something4();