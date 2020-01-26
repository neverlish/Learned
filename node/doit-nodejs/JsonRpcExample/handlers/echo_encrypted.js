var crypto = require('crypto-js');
var echo = function(params, callback) {
  console.log('JSON-RPC echo 호출됨.');
  console.dir(params);
  try {
    // 복호화 테스트
    var encrypted = params[0];
    var secret = 'my secret';
    var decrypted = crypto.AES.decrypt(encrypted, secret).toString(crypto.enc.Utf8);

    console.log('복호화된 데이터 : ' + decrypted);

    // 암호화 테스트
    var encrypted = '' + crypto.AES.encrypt(decrypted + ' -> 서버에서 보냄.', secret);

    console.log(encrypted);
    params[0] = encrypted;
  } catch(err) {
    console.dir(err);
    console.log(err.stack);
  }

  callback(null, params);
};

module.exports = echo;
