// 5 디자인 패턴 실용 - 1 모듈 패턴

// 모듈 패턴이 활용되는 간단한 예
$.get('/api/unikys').done(function(result) {
  var unikys = result;
  console.log(unikys);
});

// 모듈 패턴의 기본 패턴
(function (window) {
  var myLibrary = {
    helloWorld: function() {
      console.log('Hello World!');
    },
    hello: {
      world: function() {
        console.log('Hello Module!!');
      }
    }
  };

  window.myLibrary = myLibrary;
}(window));

// 모듈 패턴 활용 예
myLibrary.helloWorld(); // Hello World!
myLibrary.hello.world(); // Hello Module!!

// 글로벌 변수에 모듈 패턴을 할당하는 형태
var myLibrary = (function (window) {
  var myLibrary = {
    // 생략
  };
  return myLibrary;
}(window));

// 글로벌 변수에 객체 표현식으로 모듈 패턴을 할당하는 형태
var myLibrary = (function (window) {
  return {
    // 생략
  };
}(window));

// 구글의 모듈 패턴 활용 예
var latlng = new google.maps.LatLng(-34.397, 150.644);
var map = new google.maps.Map(document.getElementById('canvas'), {
  center: latlng
});

// 야후 YUI의 모듈 패턴 활용 예
var mayAutocomp = new YAHOO.widget.AutoComplete('input', 'container', data);

// 자바스크립트에서 네임스페이스 생성 방법
(function (windows, undefined) {
  var _myLibary = window.myLibrary;
  if (!_myLibary) {
    _myLibary = {};
  }
  if (!_myLibary.unikys) {
    _myLibary.unikys = {};
  }
  _myLibary.unikys.sayHello = function () {
    console.log('Hello, my name is Unikys');
  }
  window.myLibrary = myLibrary;
}(window));

// jQuery의 플러그인 관리 부분

jQuery = function (selector, context) {
  return new jQuery.fn.init(selector, context);
},
jQuery.fn = jQuery.prototype = {
  // 생략
}

init = jQuery.fn.init = function(selector, context) {
  // 생략
};
init.prototype = jQuery.fn;
