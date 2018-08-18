'use strict';

const AWS = require('aws-sdk');
const s3 = new AWS.S3();
const sns = new AWS.SNS();

module.exports.hello = (event, context, callback) => {
  const html = `
    <html>
      <head>
        <title>Page Title</title>
      </head>
      <body>
        <h1>Hello</h1>
      </body>
    </html>
  `;

  const response = {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'text/html'
    },
    body: html
  };

  callback(null, response);
  
};

module.exports.catNames = (event, context, callback) => {
  const catNames = require('cat-names');

  const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: catNames.random()
    })
  };

  callback(null, response);
};

module.exports.testPermissions = (event, context, callback) => {
  const bucket = 'jinho01';
  const key = 'log2.txt';
  const write = {
    Bucket: bucket,
    Key: key,
    Body: 'Test'
  };

  s3.putObject(write, (err, data) => {
    if (err) return callback(err);

    const read = { Bucket: bucket, Key: key };
    s3.getObject(read, (err, data) => {
      if (err) return callback(err);

      const response = {
        statusCode: 200,
        body: data.Body.toString()
      };

      callback(null, response);
    })
  })
}

module.exports.processLog = (event, context, callback) => {
  const bucketName = event.Records[0].s3.bucket.name;
  const objectKey = event.Records[0].s3.object.key;
  const s3Params = { 
    Bucket: bucketName, 
    Key: objectKey 
  };

  s3.getObject(s3Params, (err, data) => {
    if (err) throw err;

    // check if file have errors to report
    const fileContent = data.Body.toString();   
    if (fileContent.indexOf('error') !== -1) {         
      const msg = `file ${objectKey} has errors`;
      const snsParams = { 
        Message: msg, 
        TopicArn: 'arn:aws:sns:ap-northeast-2:367416660003:email-alerts'
      };

      sns.publish(snsParams, callback);
    }
  });
};

module.exports.processTask = (event, context, callback) => {

  const time = new Date().toUTCString();
  const msg = `Lambda triggered on ${time}`;
  const snsParams = { 
    Message: msg, 
    TopicArn: 'arn:aws:sns:ap-northeast-2:367416660003:email-alerts' // use you account number and SNS topic
  };

  sns.publish(snsParams, callback);
};
