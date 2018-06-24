// 04-2-2 while 문과 do-while 문 - while 루프를 이용해 1부터 100까지 더하기

let count: number = 1;
let sum: number = 0;

while (count <= 100) {
  sum += count;
  count++;
}

console.log(sum); // 5050
