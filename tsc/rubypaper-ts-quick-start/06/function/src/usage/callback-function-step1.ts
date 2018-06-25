// 06-3-3 콜백 함수의 타입 선언과 활용 - 단순한 형태의 콜백 함수

function echoFunction(message: string, callback) {
  return callback(message);
}

let responseMessage = echoFunction("hello world!", message => message);
console.log(responseMessage);
