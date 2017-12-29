// 7 비동기

var _ = require('../partial');

function square(a) {
  return new Promise(function(resolve) {
    setTimeout(function() {
      resolve(a * a);
    }, 500);
  })
}

console.log(1);
square(10)
  .then(function(res) {
    console.log(2);
    console.log(res); // 100
  }).then(function() {
    console.log(3);
  });

square(10)
  .then(square)
  .then(square)
  .then(square)
  .then(console.log); // 10000000000000000


_.go(square(10),
  square,
  square,
  square,
  console.log); // 10000000000000000

var list = [2, 3, 4];

new Promise(function(resolve) {
  (function recur(res) {
    if (list.length === res.length) return resolve(res);
    square(list[res.length]).then(function(val) {
      res.push(val);
      recur(res);
    })
  })([]);
}).then(console.log); // [ 4, 9, 16 ]

_.go(list,
  _.map(square),
  _.map(square),
  _.map(square),
  console.log); // [ 256, 6561, 65536 ]
