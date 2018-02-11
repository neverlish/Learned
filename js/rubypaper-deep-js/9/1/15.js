// 9 자바스크립트 표준 - 1 ECMAScript 6 표준 - 15 Promise 모듈

// Promise 활용 예
function sendMsg(msg, timeout) {
  return new Promise((resolve, reject) => {
    setTimeout((() => {
      resolve(msg);
    }), timeout);
  });
}

sendMsg('Hello, ', 1000).then((msg) => 
  sendMsg(`${msg} World`, 1000)
).then((msg) => {
  console.log(`${msg}! All done`); // Hello,  World! All done
});

// XMLHttpREquest를 처리하기 위한 Promise 활용 예
(() => {
  var promise = new Promise(function(resolve, reject) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', '/longLoad');
    xhr.onload = function() {
      if (this.status >= 200 && this.status < 300) {
        resolve(this.responseText);
      } else {
        reject(this.statusText);
      }
    };
    xhr.onerror = function() {
      reject(this.statusText);
    }
    xhr.send();
  });

  promise.then(function (responseText) {
    console.log(responseText);
  }).catch(function(statusText) {
    console.log('Error! ' + statusText);
  })
})();
