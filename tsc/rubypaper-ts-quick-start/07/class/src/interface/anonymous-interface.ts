// 07-2-5 인터페이스에 함수 타입을 지정하기 - 인터페이스 익명 함수 타입 정의하기

interface IFormat {
  (data: string, toUpper?: boolean): string;
}

let format: IFormat = function(str: string, isUpper: boolean) {
  if (isUpper) {
    return str.toUpperCase();
  } else {
    return str.toLowerCase();
  }
};

console.log(format('1 : Happy!')); // 1 : happy!
console.log(format('2 : Happy!', true)); // 2 : HAPPY!
console.log(format('3 : Happy!', false)); // 3 : happy!
