function asyncDelay(order: number) {
  return new Promise(function (resolve, reject) {
    let ms: number = (Math.floor(Math.random() * 1000) + 1);
    setTimeout(function() {
      console.log('작업 완료 : ' + order);
      resolve(order);
    }, ms);
  }).then();
}

function syncResultPromise() {
  let p1 = asyncDelay(1);
  let p2 = asyncDelay(2);
  let p3 = asyncDelay(3);
  let p4 = asyncDelay(4);

  Promise.all([p1, p2, p3, p4]).then(function(order) {
    console.log(`동기화된 출력 : ${order}`); // 동기화된 출력 : 1,2,3,4
  });
}

syncResultPromise();
