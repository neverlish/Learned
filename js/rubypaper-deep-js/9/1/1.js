// 9 자바스크립트 표준 - 1 ECMAScript 6 표준 - 1 변수, 상서 선언 키워드(let, const)

// let와 const 키워드를 통한 변수 선언
let myObject = {
  name: 'unikys',
  say() {
    console.log('My name is ' + this.name);
  }
};

myObject.say();

const constString = 'This is a constant';
// constString = 'This will raise an error'; // TypeError: Assignment to constant variable.

// var와 let 키워드 블록 적용 비교
if (true) {
  var varVariable = 1;
  let letVariable = 2;
}
console.log(varVariable); // 1
// console.log(letVariable); // ReferenceError: letVariable is not defined

// var과 let 키워드 블록 적용 비교
let myArray = [0,1,2,3,4,5],
    length = myArray.length;

for (let i = 0; i < length; i++) {
  if (myArray[i] > 3) {
    break;
  }
}

// console.log(myArray[i]); // ReferenceError: i is not defined

// var과 let 키워드 중복 변수명 정의 비교
var duplicatedName = 'This is with var';
var duplicatedName = 'No problem';
// let duplicatedName = 'Syntax error will be raised'; // SyntaxError: Identifier 'duplicatedName' has already been declared
