module.exports.hello = (event, context, callback) => {
  console.log(process.env.testEnvVariable);
  const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: '함수 실행 성공!',
      input: event,
    }),
  };
  callback(null, response);
};
