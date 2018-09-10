// 10-2-4 구조 서브타이핑 - 구조 서브타이핑의 조건 - 하위 타입이 상위 타입으로 구조 서브타이핑 되는 예

type upper = { a: string, b: string };
type sub = { a: string, b: string, c: string };

let objectUpper: upper = { a: 'a', b: 'b' };
let objectSub: sub = { a: 'a', b: 'b', c: 'c' };

objectUpper = objectSub;
console.log(objectUpper);
