// 09-2-4 네버 타입 - 조건 분기문에서 닿을 수 없는 코드가 발생하는 예

function nevertest(value: string | number) {
  if (typeof value === 'string') {
    return value;
  }
  else if (typeof value === 'number') {
    return value;
  } else {
    // return value; // 닿을 수 없는 코드
  }
}

console.log(nevertest('test'));
