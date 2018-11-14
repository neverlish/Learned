const AWS = require('aws-sdk');
const simpledb = new AWS.SimpleDB({ region: 'us-east-1' });

const params = {
  DomainName: 'Products'
};

simpledb.createDomain(params, (err, data) => {
  if (err) console.log(err, err.stack);
  else console.log(data);
});

params.DomainName = 'ShoppingCart';

simpledb.createDomain(params, (err, data) => {
  if (err) console.log(err, err.stack);
  else console.log(data);
});
