// 5 디자인 패턴 - 9 콜백 패턴
// XMLHttpREquest와 콜백 패턴 활용

(function() {
  function ajax(method, url, data, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open(method, url);
    xhr.onload = function() {
      if (xhr.status === 200) {
        callback.call(this, xhr.responseText);
      }
    }
    xhr.send(data);
  }

  ajax('POST', '/login', 'id=hello&password=world', function(responseText) {
    if (responseText === 'Success') {
      alert('Success to login!');
      ajax('GET', '/userInfo', 'id=hello', displayUserInfo);
    } else {
      alert('Failed to login');
    }
  });

  function displayUserInfo(responseText) {
    document.getElementById('userInfo').innerHTML = responseText;
  }
}());
