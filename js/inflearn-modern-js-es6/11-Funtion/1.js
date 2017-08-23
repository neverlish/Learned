// 11 Function - 1 Arrow function 활용

setTimeout(() => {
  console.log('settimeout arrow');
}, 1000);

// let newArr = [1, 2, 3, 4, 5].map((v) => {
//   return v * 2;
// });

let newArr = [1,2,3,4,5].map((v) => v*2);

console.log('arrow newArr', newArr);
