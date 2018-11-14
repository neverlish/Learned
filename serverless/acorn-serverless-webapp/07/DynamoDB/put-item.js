const AWS = require('aws-sdk');
const documentClient = new AWS.DynamoDB.DocumentClient({ region: 'ap-northeast-2' });

const params = {
  TableName: 'Products',
  Item: {
    ID: 'lonely-bird',
    Name: 'Lonely Bird',
    Price: 29.99,
    Image: 'https://s3.amazonaws.com/serverless-store-media/product-images/lonely-bird.jpg',
    Comments: [
      {
        ID: 'ABC',
        Username: 'John Doe',
        Date: '2016-12-24T17:15:10+00:00',
        Text: 'I liked it.'
      },
      {
        ID: 'XYZ',
        Username: 'Jane Smith',
        Date: '2016-12-24T18:15:10+00:00',
        Text: 'I liked it too.'
      }
    ]
  }
};

documentClient.put(params, (err, data) => {
  if (err) console.log(err, err.stack);
  else console.log(data);
});

// const dynamodb = new AWS.DynamoDB({ region: 'ap-northeast-2' });

// const params = {
//   TableName: 'Products',
//   Item: {
//     ID: { S: 'lonely-bird' },
//     Name: { S: 'Lonely Bird' },
//     Price: { N: '29.99' },
//     Image: { S: 'https://s3.amazonaws.com/serverless-store-media/product-images/lonely-bird.jpg' },
//     Comments: {
//       L: [
//         {
//           M: {
//             ID: { S: 'ABC' },
//             Username: { S: 'John Doe' },
//             Date: { S: '2016-12-24T17:15:10+00:00' },
//             Text: { S: 'I liked it.' }
//           },
//           M: {
//             ID: { S: 'XYZ' },
//             Username: { S: 'Jane Smith' },
//             Date: { S: '2016-12-24T18:15:10+00:00' },
//             Text: { S: 'I liked it too.' }
//           }
//         }
//       ]
//     }
//   }
// };

// dynamodb.putItem(params, (err, data) => {
//   if (err) console.log(err, err.stack);
//   else console.log(data);
// });
