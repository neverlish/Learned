// 01 scope - 3 const - 선언된 변수 지키기

function home() {
  var homename = 'my house';
  homename = 'your house';
  console.log(homename);
}

home();

function home2() {
  const homename = 'my house';
  // homename = 'your house'; // TypeError: Assignment to constant variable.
  console.log(homename);
}

home2();

// const 를 기본으로 사용한다.
// 그런데 변경이 될 수 있는 변수는 let을 사용한다.
// var는 사용하지 않는다.
