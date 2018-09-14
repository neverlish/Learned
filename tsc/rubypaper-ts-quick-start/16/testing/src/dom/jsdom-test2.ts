// 16-3-3 DOM 테스트 - jsdom과 jQuery를 결합해 DOM을 다뤄보기 - 위키피디아 페이지에 포함된 a 엘리먼트의 텍스트를 모두 표시함

import jsdom = require('jsdom');
import fs = require('fs');

jsdom.env(
  'https://en.wikipedia.org/wiki/korea',
  ['http://code.jquery.com/jquery.js'],
  function(err, window) {
    let $ = window.$;
    $('a').each(function() {
      console.log($(this).text());
    })
  }
)
