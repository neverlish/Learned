 // 클로저를 활용할 때 주의 사항 - 루프 안에서 클로저를 활용할 때는 주의하자

//  function countSeconds(howMany) {
//    for (var i = 1; i <= howMany; i++) {
//      setTimeout(function() {
//        console.log(i);
//      }, i * 1000);
//    }
//  };

function countSeconds(howMany) {
  for (var i = 1; i <= howMany; i++) {
    (function (currentI) {
      setTimeout(function() {
        console.log(currentI);
      }, currentI * 1000);
    }(i));
  }
};
countSeconds(3);
