const { defer } = require('rxjs');

function getPromise(val) {
  return new Promise(resolve => resolve(val));
}

// defer 함수 안에서 async 함수 사용
defer(async function() {
  return await getPromise('Hello RxJS!');
}).subscribe(x => console.log(x)); // Hello RxJS!
