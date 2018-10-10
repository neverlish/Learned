const fs = require('fs');

setInterval(() => {
  fs.unlink('./abcdefg.js', (err) => {
    if (err) {
      console.error(err);
    }
  })
}, 1000);

/*
{ Error: ENOENT: no such file or directory, unlink './abcdefg.js'
  errno: -2,
  code: 'ENOENT',
  syscall: 'unlink',
  path: './abcdefg.js' }
{ Error: ENOENT: no such file or directory, unlink './abcdefg.js'
  errno: -2,
  code: 'ENOENT',
  syscall: 'unlink',
  path: './abcdefg.js' }
(계속 반복)
*/
