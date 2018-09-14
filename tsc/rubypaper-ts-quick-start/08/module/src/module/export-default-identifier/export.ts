// 08-3-5 디폴트 모듈의 이해와 사용법 - 디폴트 모듈로 타입과 모듈을 함께 노출 - 함수명과 인터페이스 타입명을 일치시켜 export함

interface HelloMessage { first: string; second: string; }
function HelloMessage(name: string): HelloMessage {
  let message: HelloMessage = { first: 'hello', second: name };
  return message;
}

export default HelloMessage;
