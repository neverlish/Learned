'use strict';

module.exports.hello = async (event, context) => {
  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': 'https://www.example.com'
    },
    body: JSON.stringify({
      message: 'Go Serverless v1.0! Your function executed successfully!',
      input: event,
    }),
  };

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
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
  const AWS = require('aws-sdk');
  const s3 = new AWS.S3();
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
