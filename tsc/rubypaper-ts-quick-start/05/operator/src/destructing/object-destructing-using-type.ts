// 5-2-1 객체 디스트럭처링 - 객체 디스트럭처링 시 type 키워드 활용

type C = { a: string, b?: number };
function fruit({ a, b }: C): void {
  console.log(a, b);
}

fruit({ a: "apple", b: 10 }); // apple 10
fruit({ a: "apple" }); // apple undefined
