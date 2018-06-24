// 5-2-1 객체 디스트럭처링 - 디스트럭처링 매개변수 선언 - 함수의 매개변수에 인수를 전달할 때 객체 디스트럭처링 적용

function printProfile({name, nationality = "none"} = { name: "anonymous"}) {
  console.log(name, nationality);
}

printProfile(); // anonymous none
printProfile({ name: "happy" }); // happy none
printProfile({ name: "happy", nationality: "korea" }); // happy korea
