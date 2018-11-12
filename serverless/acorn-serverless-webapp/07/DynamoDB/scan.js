const AWS = require('aws-sdk');
const documentClient = new AWS.DynamoDB.DocumentClient({ region: 'ap-northeast-2' });

const params = {
  TableName: 'Products'
};

documentClient.scan(params, (err, data) => {
  if (err) console.log(err, err.stack);
  else console.log(data);
});
