// 10-2-4 구조 서브타이핑 - 매개변수 개수가 다른 함수 타입 간의 구조 서브타이핑 - 구조가 일부 다른 타입 간의 타입 호환

// 익명 함수에 선언된 매개변수가 다른 경우
let funcUpper = (a: string) => a;
let funcSub = (a: string, b: string) => a + b;

funcSub = funcUpper;
// funcUpper = funcSub; // Type '(a: string, b: string) => string' is not assignable to type '(a: string) => string'.
console.log(`${funcSub('hello', 'world')}`); // hello
