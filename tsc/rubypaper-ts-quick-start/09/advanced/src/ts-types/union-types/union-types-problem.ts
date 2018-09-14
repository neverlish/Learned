// 09-1-2 타입 가드 - 유니언 타입의 매개변수에 타입 가드를 적용하지 않았을 때

function myIndexOf(x: number | string, y: string) {
  // return x.indexOf(y); // 오류
}

console.log(myIndexOf('hello', 'e'));
