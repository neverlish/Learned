// 5-2-2 배열 디스트럭처링 - 배열의 요소를 함수의 디스트럭처링 매개변수로 전달

function f([first, second]: [number, string]) {
  console.log(first);
  console.log(second);
}

f([100, "hello"]);

/*
100
hello
*/
