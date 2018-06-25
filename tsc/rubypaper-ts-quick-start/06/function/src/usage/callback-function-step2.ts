// 06-3-3 콜백 함수의 타입 선언과 활용 - 화살표 함수 타입을 변수에 추가한 후 콜백 함수 호출하기

// 공통으로 사용할 콜백 함수 타입의 정의
type EchoCallbackType = (message: string) => void;

// 공통으로 사용할 콜백 함수 정의
let callbackEcho: EchoCallbackType = message => message;
let callbackEchoWithLength: EchoCallbackType = message => `${message}(${message.length})`;

function echoFunction2(message: string, callback) {
  return callback(message);
}

let responseEcho = echoFunction2("hello", callbackEcho);
let responseEchoWithLength = echoFunction2("hello", callbackEchoWithLength);

console.log(responseEcho); // hello
console.log(responseEchoWithLength); // hello(5)
