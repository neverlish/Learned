import express from 'express';
const server = express();

console.log('changing the file');

server.listen(4000, () => {
  console.log('listening on port 4000');
});
