// 03 Array - 1 for of - 순회하기
var data = [1, 2, undefined, NaN, null, ''];

for (var i = 0; i < data.length; i++) {
  console.log(data[i]);
}

data.forEach(function(value) {
  console.log('value is', value);
});

Array.prototype.getIndex = function() {};

for(let idx in data) {
  // for in 은 원래 object의 순회를 위한 구문. 배열에 protytpe으로 추가된 것도 함께 반환함.
  console.log(data[idx]);
}

for(let value of data) {
  console.log(value);
}

var str = 'hello world!!!!';
for (let value of str) {
  console.log(value); // 문자열 단위로 순회
}
