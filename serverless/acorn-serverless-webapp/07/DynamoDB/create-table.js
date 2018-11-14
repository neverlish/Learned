const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB({region: 'ap-northeast-2'});

let params = {
  TableName: 'Products',
  AttributeDefinitions: [
    {
      AttributeName: 'ID',
      AttributeType: 'S' // 문자열
    }
  ],
  KeySchema: [
    {
      AttributeName: 'ID',
      KeyType: 'HASH'
    }
  ],
  ProvisionedThroughput: {
    ReadCapacityUnits: 5, // 기본값
    WriteCapacityUnits: 5 // 기본값
  }
};

dynamodb.createTable(params, (err, data) => {
  if (err) console.log(err, err.stack);
  else console.log(data);
})
