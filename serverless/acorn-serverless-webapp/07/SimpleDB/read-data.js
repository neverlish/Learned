const AWS = require('aws-sdk');
const simpledb = new AWS.SimpleDB({ region: 'us-east-1' });

const selectParams = {
  SelectExpression: 'select * from Products where Name = "Lonely Bird"'
};

simpledb.select(selectParams, (err, data) => {
  if (err) console.log(err, err.stack);
  else if (data.Items) {
    data.Items.map(item => {
      item.Attributes.map(attr => {
        console.log(attr);
      });
    });
  }
  else console.log('No results');
});
/*
{ Name: 'Price', Value: '2999' }
{ Name: 'Name', Value: 'Lonely Bird' }
*/
