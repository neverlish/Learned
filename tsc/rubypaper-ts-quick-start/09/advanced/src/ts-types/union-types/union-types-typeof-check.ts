// 09-1-2 타입 가드 - 타입 가드의 적용

function myIndexOf2(x: number | string, y: string) {
  if (typeof x === 'string') {
    return x.indexOf(y);
  }
  else {
    return -1;
  }
}

console.log(myIndexOf2('hello', 'e')); // 1
