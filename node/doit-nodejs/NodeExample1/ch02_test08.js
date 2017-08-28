var path = require('path');

// 디렉터리 이름 합치기
var directories = ['users', 'mike', 'docs'];
var docsDirectory = directories.join(path.sep);
console.log('문서 디렉터리 : %s', docsDirectory);

// 디렉터리 이름과 파일 이름 합치기
var curPath = path.join('/Users?mike', 'notepad.exe');
console.log('파일 패스 : %s', curPath);

// 패스에서 디렉터리, 파일 이름, 확장자 구별하기
var filename = '/Users/jinhohyeon/Desktop/neverlish/node/doit-nodejs/NodeExample1/ch02_test08.js';
var dirname = path.dirname(filename);
var basename = path.basename(filename);
var extname = path.extname(filename);

console.log('디렉터리 : %s, 파일 이름 : %s, 확장자 : %s', dirname, basename, extname);
