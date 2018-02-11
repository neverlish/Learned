// 3 자바스크립트의 변수 - 9 변수 사용 방법과 성능

// 상위 스코프 체인의 변수를 사용하는 일반적인 예
(function() {
  var divMouseover = document.getElementById('divMouseover'),
      divFloatingContent = document.getElementById('divFloatingContent');

  divMouseover.onmouseover = function() {
    var xhr = new XMLHttpRequest();
    divMouseover.style.backgroundColor = '#FF0000';
    divMouseover.style.color = 'white';
    divMouseover.style.fontSize = '12px';
    xhr.open('GET', 'http://myserver.com/floating_contents');
    xhr.onload = function() {
      divFloatingContent.innerHTML = xhr.responseText;
      divFloatingContent.style.display = 'block';
    };
    xhr.send();
  };
  divMouseover.onmouseout = function() {
    divMouseover.style.backgroundColor = '#FFFFFF';
    divMouseover.style.color = 'black';
    divMouseover.style.fontSize = '10px';
    divFloatingContent.style.display = 'none';
  }
}());

// 상위 스코프 체인의 변수를 로컬 변수로 정의하여 사용하는 예
(function() {
  var divMouseover = document.getElementById('divMouseover'),
      divFloatingContent = document.getElementById('divFloatingContent');

  divMouseover.onmouseover = function() {
    var xhr = new XMLHttpRequest(),
        localDivMouseover = divMouseover;
    localDivMouseover.style.backgroundColor = '#FF0000';
    localDivMouseover.style.color = 'white';
    localDivMouseover.style.fontSize = '12px';
    xhr.open('GET', 'http://myserver.com/floating_contents');
    xhr.onload = function() {
      var localDivFloatingContent = divFloatingContent;
      localDivFloatingContent.innerHTML = xhr.responseText;
      localDivFloatingContent.style.display = 'block';
    };
    xhr.send();
  };
  divMouseover.onmouseout = function() {
    var localDivMouseover = divMouseover;
    localDivMouseover.style.backgroundColor = '#FFFFFF';
    localDivMouseover.style.color = 'black';
    localDivMouseover.style.fontSize = '10px';
    divFloatingContent.style.display = 'none';
  }
}());

// DOM의 style을 변수로 정의하여 사용하는 예
(function() {
  var divMouseover = document.getElementById('divMouseover'),
      divFloatingContent = document.getElementById('divFloatingContent');

  divMouseover.onmouseover = function() {
    var xhr = new XMLHttpRequest(),
        divMouseoverStyle = divMouseover.style;
    divMouseoverStyle.backgroundColor = '#FF0000';
    divMouseoverStyle.color = 'white';
    divMouseoverStyle.fontSize = '12px';
    xhr.open('GET', 'http://myserver.com/floating_contents');
    xhr.onload = function() {
      var localDivFloatingContent = divFloatingContent;
      localDivFloatingContent.innerHTML = xhr.responseText;
      localDivFloatingContent.style.display = 'block';
    };
    xhr.send();
  };
  divMouseover.onmouseout = function() {
    var divMouseoverStyle = divMouseover.style;
    divMouseoverStyle.backgroundColor = '#FFFFFF';
    divMouseoverStyle.color = 'black';
    divMouseoverStyle.fontSize = '10px';
    divFloatingContent.style.display = 'none';
  }
}());
