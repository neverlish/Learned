// 5 디자인 패턴 - 10 커링 패턴
// XMLHttpRequest를 위한 커링 패턴 응용

(function() {
  Function.prototype.curry = function() {
    if (arguments.length < 1) {
      return this;
    }
    var _this = this,
        args = Array.prototype.slice.apply(arguments);

    return function() {
      return _this.apply(this, args.concat(Array.prototype.slice.apply(arguments)));
    }
  }

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

  var ajaxGet = ajax.curry('GET'),
      ajaxPost = ajax.curry('POST'),
      ajaxPut = ajax.curry('PUT'),
      ajaxDelete = ajax.curry('DELETE');

  ajaxGet('/data', null, function(responseText) {
    console.log(responseText);
  })
}());
