// 3 자바스크립트의 변수 - 3 글로벌 변수

// 글로벌 변수 사용 예
var element = document.getElementById('div'),
    insertHTML = '<b>Hello world</b>';

element.innerHTML = insertHTML;

// 글로벌 변수를 사용하여 이벤트 핸들러를 할당하는 예
var element = document.getElementById('div'),
    button = document.getElementById('button'),
    insertHTML = '<b>Hello world</b>';

button.onclick = function() {
  element.innerHTML = insertHTML;
}

// 글로벌 변수르 사용하여 AJAX 를 활용하는 예
var element = document.getElementById('div'),
    button = document.getElementById('button'),
    xhr = new XMLHttpRequest();

button.onclick = function() {
  xhr.open('GET', 'http://unikys.tistory.com');
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
      element.innerHTML = xhr.responseText;
    }
  };
  xhr.send();
};

// 글로벌 변수 충돌 예 1
var element = document.getElementById('div'),
    button = document.getElementById('button'),
    xhr = new XMLHttpRequest();

button.onclick = function() {
  xhr.open('GET', 'http://unikys.tistory.com');
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
      element.innerHTML = xhr.responseText;
    }
  };
  xhr.send();
}

// 글로벌 변수 충돌 예 2
(function() {
  xhr = new XMLHttpRequest();
  xhr.open('GET', 'http://unikys.tistory.com');
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
      console.log(xhr.responseText);
    }
  };
}());

// 클로저를 활용하여 로컬 변수를 활용하는 예
(function() {
  var appendDiv = document.getElementById('appendDiv'),
      callback = {
        "1": (function() {
          var div = document.createElement('div');
          div.innerHTML = '#1';
          return function() {
            return div.cloneNode(true);
          };
        }()),
        "2": (function() {
          var img = document.createElement('img');
          img.src = 'http://cfile24.uf.tistory.com/image/203E5A424F471E3025FA01';
          return function() {
            return img.cloneNode(true);
          };
        }()),
        "delete": function() {
          appendDiv.innerHTML = '';
        }
      };
  function append(e) {
    var target = e.target || e.srcElement || event.srcElement,
        callbackFunction = callback[target.getAttribute('data-cb')];
    appendDiv.appendChild(callbackFunction());
  }
  document.getElementById('wrapper').addEventListener('click', append);
}());

// 비동기 이벤트처리에 문제가 발생 가능한 예
var xhr = new XMLHttpRequest();
document.getElementById('buttonCheckId').addEventListener('click', function() {
  var id = document.getElementById('inputId').value;
  xhr.open('GET', 'http://unikys.tistory.com/api/checkId?id=' + id);
  xhe.onreadystatechange = function() {
    if (xhr.readyStatus === 4 && xhr.status === 200) {
      if (xhr.responseText === '1') {
        alert('ID exists!');
      }
    };
  }
});
