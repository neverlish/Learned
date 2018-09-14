// 11-2-1 제네릭 함수 선언 - 타입 제약이 없는 타입 매개변수 - 타입 매개변수 T를 사용하는 concat 함수

function concat3<T>(strs: T, strs2: T) {
  console.log(typeof strs, strs);
  console.log(typeof strs2, strs2);
  return String(strs) + String(strs2);
}

concat3('abc', '123');
concat3<string>('abc', '123');
/*
string abc
string 123
string abc
string 123
*/
