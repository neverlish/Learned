// 배열의 각 원소 총합 구하기 1

function sum(arr) {
  var len = arr.length;
  var i = 0, sum = 0;

  for (; i < len; i++) {
    sum += arr[i];
  }

  return sum;
}

var arr = [1, 2, 3, 4];
console.log(sum(arr)); // (출력값) 10
