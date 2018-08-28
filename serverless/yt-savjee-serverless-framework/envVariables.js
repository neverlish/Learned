'use strict';

module.exports.handler = async (event, context) => {
  return {
    statusCode: 200,
    body: JSON.stringify({
      variable: 'The value of the variable is: ' + process.env.OTHER_API_KEY
    }),
  };
}
