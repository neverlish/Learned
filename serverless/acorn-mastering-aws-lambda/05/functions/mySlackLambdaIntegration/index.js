const AWS = require('aws-sdk');
const url = require('url');
const https = require('https');

// 환경변수 kmsEncryptedHookUrl에 저장된 base64로 암호화된 키(CiphertextBlob)
const kmsEncryptedHookUrl = process.env.kmsEncryptedHookUrl;
// 환경변수 slackChannel에 저장된 메시지를 전송할 슬랙 채널
const slackChannel = process.env.slackChannel;
let hookUrl;

function postMessage(message, callback) {
  const body = JSON.stringify(message);
  const options = url.parse(hookUrl);
  options.method = 'POST';
  options.headers = {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(body),
  };

  //console.log("options: ", options);

  const postReq = https.request(options, (res) => {
    const chunks = [];
    res.setEncoding('utf8');
    res.on('data', (chunk) => chunks.push(chunk));
    res.on('end', () => {
      if (callback) {
        callback({
          body: chunks.join(''),
          statusCode: res.statusCode,
          statusMessage: res.statusMessage,
        });
      }
    });
    return res;
  });

  postReq.write(body);
  postReq.end();
}

function processEvent(event, callback) {
  const message = JSON.parse(event.Records[0].Sns.Message);
  const alarmName = message.AlarmName;
  const newState = message.NewStateValue;
  const reason = message.NewStateReason;

  const slackMessage = {
    channel: slackChannel,
    text: `${alarmName} 상태는 현재 ${newState}: ${reason}`
  };
  console.log('슬랙 메시지 : ', slackMessage);
  postMessage(slackMessage, (response) => {
    if (response.statusCode < 400) {
      console.info('메시지 발송 성공');
      callback(null);
    } else if (response.statusCode < 500) {
      console.error(`슬랙 API에 메시지 전송 오류 : ${response.statusCode} - ${response.statusMessage}`);
      callback(null); // 오류는 요청 문제로 발생했으니 재시도하지 않는다.
    } else {
      // Lambda 함수를 재실행한다.
      callback(`메시지 처리 중 발생한 서버 오류 : ${response.statusCode} - ${response.statusMessage}`);
    }
  });
}

exports.handler = (event, context, callback) => {
  console.log('EVENT: ', JSON.stringify(event));

  if (hookUrl) {
    processEvent(event, callback);
  } else if (kmsEncryptedHookUrl && kmsEncryptedHookUrl !== '<kmsEncryptedHookUrl>') {
    const encryptedBuf = Buffer.from(kmsEncryptedHookUrl, 'base64');
    const cipterText = {
      CiphertextBlob: encryptedBuf
    };
    const kms = new AWS.KMS();
    kms.decrypt(cipterText, (err, data) => {
      if (err) {
        console.log('Decrypt error:', err);
        return callback(err);
      }
      hookUrl = `https://${data.Plaintext.toString('ascii')}`;
      processEvent(event, callback);
    });
  } else {
    callback('훅 URL이 설정되지 않았음');
  }
};