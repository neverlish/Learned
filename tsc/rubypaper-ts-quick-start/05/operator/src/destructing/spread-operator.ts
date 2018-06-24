// 05-3-1 전개 연산자를 이용한 배열 요소 확장 - 전개 연산자 활용(배열 합치기와 배열 디스트럭처링)

// 배열 합치기
let arr: number[] = [1, 2];
let arr2: number[] = [...arr, 3, 4];

console.log('1번 : ', arr2); // 1번 :  [ 1, 2, 3, 4 ]

// 배열 디스트럭처링
let [firstItem, ...rest]: [number, number, number] = [10, 20, 30];
console.log('2번 : ', firstItem); // 2번 :  10
console.log('3번 : ', rest); // 3번 :  [ 20, 30 ]
console.log('4번 : ', rest[0]); // 4번 :  20
