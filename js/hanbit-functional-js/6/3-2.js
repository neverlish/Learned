// 6 재귀 - 3 너무 깊은 재귀! - 2 트램펄린 원칙과 콜백

var _ = require('underscore');
var {JSDOM} = require('jsdom');
var {window} = new JSDOM();
var $ = require('jquery')(window)

function asyncGetAny(interval, urls, onsuccess, onfailure) {
  var n = urls.length;

  var looper = function(i) {
    setTimeout(function() { 
      if (i >= n) {
        onfailure('failed');
        return;
      }
      $.get(urls[i], onsuccess)
       .always(function() { console.log('try: ' + urls[i]); })
       .fail(function() {
         looper(i+1);
       });
    }, interval);
  }

  looper(0);
  return 'go';
}

var urls = ['http:/dsfgfgs.com', 'http://sghjgsj.biz', '_.html', 'foo.txt'];

asyncGetAny(
  2000,
  urls,
  function(data) { console.log('Got some data') },
  function(data) { console.log('all failed') }
); // => go
