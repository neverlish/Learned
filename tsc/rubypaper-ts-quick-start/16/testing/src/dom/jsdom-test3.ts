// 16-3-3 DOM 테스트 - jsdom과 jQuery를 결합해 DOM을 다뤄보기 - HTML 템플릿 파일에 선언된 입력 엘리먼트의 속성값을 가져옴

import jsdom = require('jsdom');
import fs = require('fs');
let html = fs.readFileSync('./index.html', 'utf-8');

jsdom.env(
  html,
  ['http://code.jquery.com/jquery.js'],
  function(err, window) {
    let $ = window.$;
    $('a').each(function() {
      console.log($('input[name=userID]').attr('maxlength'));
      console.log($('input[name=userPW]').attr('maxlength'));
    })
  }
)
