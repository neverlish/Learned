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
