// 9 자바스크립트 표준 - 1 ECMAScript 6 표준 - 12 모듈 기능 표준화

// module.js 예
export function getJSON(url, callback) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);
  xhr.onload = function() {
    callback(JSON.parse(this.responseText));
  };
  xhr.send();
}

export default function(url, callback) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);
  xhr.onload = function() {
    callback(this.responseText);
  };
  xhr.send();  
}

// app.js 예
import getURL, * as getURL from 'module.js'
getJSON('/getJSON', function(json) {
  console.log(json)
});
getURL('/getURL', function(data) {
  console.log(data);
})
