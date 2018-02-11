// 9 자바스크립트 표준 - 1 ECMAScript 6 표준 - 5 템플릿 문자열 표현식

// 템플릿 문자열 표현식 활용
(() => {
  let inputName = document.getElementById('name'),
      divGreetings = document.getElementById('greetings');

  inputName.addEventListener('change', () => {
    divGreetings.innerHTML = `Hello, ${inputName.value.toUpperCase()}`;
  });
})();

// 템플릿 문자열을 통한 여러 줄 출력
(() => {
  let inputName = document.getElementById('name'),
      preGreetings = document.getElementById('greetings'),
      preGreetingsES5 = document.getElementById('greetingsES5');

  inputName.addEventListener('change', () => {
    preGreetings.innerHTML = `Hello,
      ${inputName.value.toUpperCase()}\nWelcome to ES6`;
    preGreetingsES5.innerHTML = 'Hello,\n' + inputName.value.toUpperCase() + "\nI'm using ES5";
  })
})();

// 템플릿 문자열의 입력 분석 예
(() => {
  function analyze(strings, ...values) {
    console.log(strings);
    console.log(values);
    
    return 'Conditional string';
  }

  var name = 'World';
  console.log(analyze `Hello, ${name}!\nECMAScript${2 * 2 + 2} is easy`);
  /*
  [ 'Hello, ', '!\nECMAScript', ' is easy' ]
  [ 'World', 6 ]
  */

  // Strings 인자의 raw 속성
  // console.log(strings.raw[1] === '!\nECMAScript'); // false

  // String.raw 함수의 추가
  // String.raw `Hello, ${name}!\nECMAScript${2 * 2 + 2} is easy`
})();
