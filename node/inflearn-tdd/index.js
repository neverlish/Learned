const fs = require('fs');

const data = fs.readFileSync('./data.txt', 'utf8');
console.log(data);

fs.readFile('./data.txt', 'utf8', function(err, data) {
  if(err) throw err;
  console.log(data);
})
