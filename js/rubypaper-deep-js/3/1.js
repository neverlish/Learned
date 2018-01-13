// 3 자바스크립트의 변수 - 1 자바스크립트의 기본형과 typeof

// 변수형에 따른 처리 분기

if (typeof myVariable === 'function') {
  alert('Variable is function');
  myVariable.call(this);
} else if (typeof myVariable === 'string') {
  alert('Variable is string: ' + myVariable);
}

// 표현식에 따른 변수형
console.log(typeof 3); // number
console.log(typeof 'str'); // string
console.log(typeof {}); // object
console.log(typeof []); // object
console.log(typeof function() {}); // function
console.log(typeof null); // object

// null 검사 방법 예시
if (myVariable !== null && typeof myVariable === 'object') {
  // do something with myVariable
}
// or
if (!!myVariable && typeof myVariable === 'object') {
  // do something with myVariable
}
