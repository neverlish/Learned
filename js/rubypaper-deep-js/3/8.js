// 3 자바스크립트의 변수 - 8 글로벌 변수 최소화하기

// 클로저로 글로벌 변수 사용을 피하는 예
(function() {
  var localVariable = "I'm not global";
}());

// 모듈로 글로벌 변수 사용을 피하는 예
var myModule = (function() {
  var localVariable = "I'm an inside local variable";

  return {
    show: function() {
      alert(localVariable);
    }
  };
});
myModule.show();

// 즉시 호출 함수로 모듈을 생성하는 예
(function(window) {
  var localVariable = "I'm an inside local variable";

  window.myModule = {
    show: function() {
      alert(localVariable);
    }
  };
}(window));
myModule.show();

// HTML에 자바스크립트가 들어가는 일반적인 예
function validate() {
  var inputName = document.getElementById('name'),
      inputAge;

  if (inputName.value === '') {
    alert("Input name");
    inputName.focus();
    return false;
  }
  inputAge = document.getElementById('age');
  if (inputAge.value === '') {
    alert("Input age");
    inputAge.focus();
    return false;
  }
}

// HTML과 자바스크립트를 구분하여 구현한 예
(function() {
  var formWrite = document.getElementById('formWrite');
  formWrite.onsubmit = validate;

  function validate() {
    var inputName = document.getElementById('name'),
        inputAge;

    if (inputName.value === '') {
      alert("Input name");
      inputName.focus();
      return false;
    }
    inputAge = document.getElementById('age');
    if (inputAge.value === '') {
      alert("Input age");
      inputAge.focus();
      return false;
    }
  }
}());
