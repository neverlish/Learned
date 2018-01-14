// 클로저의 개념 1

function outerFunc() {
  var x = 10;
  var innerFunc = function() { console.log(x); }
  return innerFunc;
}

var inner = outerFunc();
inner(); // 10
