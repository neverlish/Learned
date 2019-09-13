exports.handler = (event, context, callback) => {
  var AWS = require('aws-sdk');
  var ec2 = new AWS.EC2();
  var params = {
    InstanceIds: [
      // 인스턴스 실제 ID
    ],
    // ADditionalInfo: 'STRING_VALUE',
    // DryRun: true || false,
  };
  ec2.startInstances(params, function (err, data) {
    if (err) console.log(err, err.stack);
    else console.log(JSON.stringify(data));
  })
}