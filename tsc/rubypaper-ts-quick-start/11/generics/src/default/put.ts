// 11-2-2 타입 매개변수의 확장 - 타입 매개변수를 2개 이상 선언하기 - 여러 타입 매개변수를 사용한 put과 get 함수

let mapArr = [];
function put<T, T2>(strs: T, strs2: T2): T;
function put(idx: any, str: any) {
  mapArr[idx] = str;
}

function get<T, T2>(idx: T): T2;
function get(idx: any) {
  return mapArr[idx];
}

put<number, string>(1, 'hello');
console.log(get<number, string>(1)); // hello
