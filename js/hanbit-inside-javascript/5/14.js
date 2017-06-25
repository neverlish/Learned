// 클로저를 활용할 때 주의 사항 - 클로저의 프로퍼티값이 쓰기 가능하므로 그 값이 여러 번 호출로 항상 변할 수 있음에 유의해야 한다

function outerFunc(argNum) {
  var num = argNum;
  return function(x) {
    num += x;
    console.log('num: ' + num);
  }
}

var exam = outerFunc(40);
exam(5);
exam(-10);
