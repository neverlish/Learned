// 클로저를 활용할 때 주의 사항 - 하나의 클로저가 여러 함수 객체의 스코프 체인에 들어가 있는 경우도 있다

function func() {
  var x = 1;
  return {
    func1: function() { console.log(++x); },
    func2: function() { console.log(-x); }
  };
};

var exam = func();
exam.func1();
exam.func2();

