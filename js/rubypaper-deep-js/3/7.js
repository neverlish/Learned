// 3 자바스크립트의 변수 - 7 var 키워드의 효율적인 사용

// 여러 개의 var 구문으로 변수를 정의한 예

(function() {
  var subjects = ['1st subject', '2nd subject', '3rd subject'];
  for (var i = 0; i < subjects.length; i++) {
    var el = document.getElementById('subject' + i);
    el.innerHTML = el.vaue = subjects[i];
    el.addEventListener('click', function() {
      alert(this.value + ' pressed!');
    });
  }

  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'http://unikys.tistory.com/list');
  xhr.onload = function() {
    var contents = JSON.parse(xhr.responseText);
    for (var i = 0; i < contents.length; i++) {
      var el = document.getElementById('content' + i);
      el.innerHTML = contents[i];
    }
  }
}());

// 하나의 var 구문으로 변수를 정의한 예

(function() {
  var subjects = ['1st subject', '2nd subject', '3rd subject'],
      el, i, xhr;
  for (i = 0; i < subjects.length; i++) {
    el = document.getElementById('subject' + i);
    el.innerHTML = el.vaue = subjects[i];
    el.addEventListener('click', function() {
      alert(this.value + ' pressed!');
    });
  }

  xhr = new XMLHttpRequest();
  xhr.open('GET', 'http://unikys.tistory.com/list');
  xhr.onload = function() {
    var contents = JSON.parse(xhr.responseText)
        el, i;
    for (i = 0; i < contents.length; i++) {
      el = document.getElementById('content' + i);
      el.innerHTML = contents[i];
    }
  }
}());

// 초기화 여부와 변수 선언 여부를 확인하는 예
console.log('선언을 안한 경우 검사:' + (typeof notExists === 'undefined')); // true
var notInitialized;
console.log('초기화를 안한 경우 검사:' + (typeof notInitialized === 'undefined')); // true

// var 키워드 생략으로 인한 오동작 예
(function() {
  var xhr, i;

  for (i = 0; i < 10; i++) {
    xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://unikys.tistory.com/' + i);
    xhr.onload = function() {
      var json = JSON.parse(xhr.responseText)
      for (i = 0; i < 5; i++) {
        alert(i + ' = ' + json[i]);
      }
    }
  }  
}());
