// 배열의 각 원소 총합 구하기 3

function reduce(func, arr, memo) {
  var len = arr.length, i = 0, accum = memo;

  for(; i < len; i++) {
    accum = func(accum, arr[i]);
  }

  return accum;
}
