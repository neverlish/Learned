let a: number = 1;
let b: string = 'banana';
let c: boolean = true;

a = 'apple';

console.log(a)
// apple을 출력. tsc에 에러가 있어도 컴파일을 함.

let arr: number[] = [1,2,3];
let arrstr: string[] = ['a','b','c'];
let arrBool: boolean[] = [true, false];

// number[] = Array<number>. number[] 보다는 Array<number> 사용. generic 때문.

let arrNum: Array<number> = [1,2,3];

