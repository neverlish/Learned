function identity (arg: number) : number {
  return arg;
}

identity(1);

identity('abc');
// 에러 반환.

function identity2 (arg: any) : any {
  // any 는 정적 타입이 가지는 장점을 가지지 않음. any를 사용할거면 차라리 js를 사용하는 것이 나음.
  return arg;
}

identity2(true);

function identity3 <T> (arg: T) : T {
  // <T>에서 타입을 받아서 그 타입을 T 두 곳에 전달함.
  return arg;
}

identity3 <number> (123);

function identity4 <T> (arg: T[]) : number {
  return arg.length;
}

identity4<string> (['abc','def']);

identity4<number> ([1,2,3]);

identity4<boolean> ([true,false]);

identity4<void> ([null, undefined]);
