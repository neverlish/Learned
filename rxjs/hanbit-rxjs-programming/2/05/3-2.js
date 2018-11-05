const { range } = require('rxjs');
const { mergeMap } = require('rxjs/operators');
const fetch = require('node-fetch');

// 최대 동시 요청 수 정하기
const colors = [
  'blue', 'red', 'black', 'yellow', 'green',
  'brown', 'gray', 'purple', 'gold', 'white'
];
const concurrent = 5;
const maxDelayInSecs = 6;
console.time('request_color');
range(0, colors.length).pipe(mergeMap(colorIndex => {
  const currentDelay = parseInt(Math.random() * maxDelayInSecs, 10);
  console.log(
    `[Request Color]: ${colors[colorIndex]}, currentDelay: ${currentDelay}`
  );
  return fetch(
    `https://httpbin.org/delay/${currentDelay}?color_name=${colors[colorIndex]}`
  ).then(res => res.json());
}, concurrent)
).subscribe(response =>
  console.log(
    `<Response> args: ${JSON.stringify(response.args)}, url: ${response.url}`
  ),
  console.error,
  () => {
    console.log('complete');
    console.timeEnd('request_color');
  }
);

/*
[Request Color]: blue, currentDelay: 0
[Request Color]: red, currentDelay: 3
[Request Color]: black, currentDelay: 5
[Request Color]: yellow, currentDelay: 3
[Request Color]: green, currentDelay: 5
<Response> args: {"color_name":"blue"}, url: https://httpbin.org/delay/0?color_name=blue
[Request Color]: brown, currentDelay: 0
<Response> args: {"color_name":"brown"}, url: https://httpbin.org/delay/0?color_name=brown
[Request Color]: gray, currentDelay: 4
<Response> args: {"color_name":"yellow"}, url: https://httpbin.org/delay/3?color_name=yellow
[Request Color]: purple, currentDelay: 5
<Response> args: {"color_name":"red"}, url: https://httpbin.org/delay/3?color_name=red
[Request Color]: gold, currentDelay: 3
<Response> args: {"color_name":"black"}, url: https://httpbin.org/delay/5?color_name=black
[Request Color]: white, currentDelay: 4
<Response> args: {"color_name":"green"}, url: https://httpbin.org/delay/5?color_name=green
<Response> args: {"color_name":"gray"}, url: https://httpbin.org/delay/4?color_name=gray
<Response> args: {"color_name":"gold"}, url: https://httpbin.org/delay/3?color_name=gold
<Response> args: {"color_name":"purple"}, url: https://httpbin.org/delay/5?color_name=purple
<Response> args: {"color_name":"white"}, url: https://httpbin.org/delay/4?color_name=white
complete
request_color: 11360.795ms
*/
