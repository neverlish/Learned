console.log('Loading function');

function publish(snsParams, publishCB) {
  var AWS = require('aws-sdk');
  AWS.config.update({
    region: "ap-northeast-2",
    endpoint: "sns.ap-northeast-2.amazonaws.com"
  });
  var sns = new AWS.SNS({ apiVersion: '2010-03-31' });
  sns.publish(snsParams, function (err, data) {
    if (err) {
      publishCB(err);
    }
    else {
      publishCB(null, "SNS sent successfully");
    }
  });
}

exports.handler = function (event, context, callback) {
  event.Records.forEach(function (record) {
    var snsTopicArn = "arn:aws:sns:ap-northeast-2:ACCOUNT_ID:myHTTPSns";
    // Kinesis data is base64 encoded so decode here
    var payload = new Buffer(record.kinesis.data, 'base64').toString('ascii');
    console.log("Decoded error log is: ", payload);
    console.log("Sending SNS topic - Alert to xyz@email.com");
    var snsParams = {
      Message: payload, /* required */
      Subject: 'HTTP Error',
      TopicArn: snsTopicArn
    };
    publish(snsParams, function (snsErr, snsVal) {
      if (snsErr) {
        console.log("Error in publishing SNS Alert: ", snsErr);
        callback(snsErr);
      }
      else {
        console.log(snsVal);
        callback(null, snsVal);
      }
    });
  });
};
