// 더하기 함수
var add = function(params, callback) {
  console.log('JSON-RPC add 호출됨.');
  console.dir(params);

  // 파라미터 체크
  if (params.length < 2) { // 파라미터 개수 부족
    callback({
      code: 400,
      message: 'Insufficient parameters'
    }, null);
    return;
  }

  var a = params[0];
  var b = params[1];
  var output = a + b;

  callback(null, output);
};

module.exports = add;
