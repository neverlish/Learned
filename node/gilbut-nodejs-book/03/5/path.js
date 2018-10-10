const path = require('path');

const string = __filename;

console.log('path.sep:', path.sep);
console.log('path.delimiter:', path.delimiter);
console.log('-------------');
console.log('path.dirname():', path.dirname(string));
console.log('path.extname():', path.extname(string));
console.log('path.basename():', path.basename(string));
console.log('path.basename():', path.basename(string, path.extname(string)));
console.log('-------------');
console.log('path.parse():', path.parse(string));
console.log('path.format():', path.format({
  dir: 'C://users/zerocho',
  name: 'path',
  ext: '.js'
}));
console.log('path.normalize():', path.normalize('C://users////zerocho\\\path.js'));
console.log('-------------');
console.log('path.isAbsolute():', path.isAbsolute('/'));
console.log('path.isAbsolute():', path.isAbsolute('./home'));
console.log('-------------');
console.log('path.relative():', path.relative('/users/zerocho/path.js', '/'));
console.log('path.join():', path.join(__dirname, '..', '..', '/users', '.', '/zerocho'));
console.log('path.resolve():', path.resolve(__dirname, '..', 'users', '.', '/zerocho'));

/*
path.sep: /
path.delimiter: :
-------------
path.dirname(): /Users/jinhohyeon/Desktop/dev/Learned/node/gilbut-nodejs-book/03/5
path.extname(): .js
path.basename(): path.js
path.basename(): path
-------------
path.parse(): { root: '/',
  dir: '/Users/jinhohyeon/Desktop/dev/Learned/node/gilbut-nodejs-book/03/5',
  base: 'path.js',
  ext: '.js',
  name: 'path' }
path.format(): C://users/zerocho/path.js
path.normalize(): C:/users/zerocho\path.js
-------------
path.isAbsolute(): true
path.isAbsolute(): false
-------------
path.relative(): ../../..
path.join(): /Users/jinhohyeon/Desktop/dev/Learned/node/gilbut-nodejs-book/users/zerocho
path.resolve(): /zerocho
*/
