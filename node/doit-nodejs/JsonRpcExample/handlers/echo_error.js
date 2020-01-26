// echo 오류 테스트 함수
var echo_error = function(params, callback) {
  console.log('JSON-RPC echo_error 호출됨.');
  console.dir(params);

  // 파라미터 체크
  if (params.length < 2) { // 파라미터 개수 부족
    callback({
      code: 400,
      message: 'Insufficient parameters'
    }, null);
    return;
  }

  var output = 'Success';
  callback(null, output);
};

module.exports = echo_error;
