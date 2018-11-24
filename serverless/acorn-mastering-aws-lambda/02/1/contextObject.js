exports.handler = (event, context, callback) => {
  console.log('컨텍스트 객체와 사용법을 알아보자!');

  console.log('value1 =', event.key1);
  console.log('value2 =', event.key2);
  console.log('value3 =', event.key3);
  console.log('remaining time =', context.getRemainingTimeInMillis());
  console.log('functionName =', context.functionName);
  console.log('AWSrequestID =', context.awsRequestId);
  console.log('logGroupName =', context.logGroupName);
  console.log('logStreamName =', context.logStreamName);

  switch (event.contextCallbackOption) {
    case "no":
      setTimeout(function () {
        console.log('제한 시간 30초!!!');
      }, 30000);
      break;
    case "yes":
      console.log('callbackWaitsForEmptyEventLoop가 false로 설정되면 콜백은 setTimeout()을 기다리지 않는다.');
      setTimeout(function () {
        console.log('제한 시간 30초!!!');
      }, 30000);
      context.callbackWaitsForEmptyEventLoop = false;
      break;
    default:
      console.log('기본 코드 블록');

  }

  callback(null, 'Lambda, 안녕!');
  // 호출자에게 결가를 전달한다. 전달된 결과는 CloudWatch 로그가 아닌 RequestResponse 호출 후에 실행 로그에 출력된다.
};

// Lambda 함수 제한 시간을 3초에서 1분으로 변경
