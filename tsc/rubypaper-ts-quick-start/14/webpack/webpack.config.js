// 14-1-3 웹팩 설정 파일을 이용한 번들링 - 기본적인 형태의 웹팩 설정 파일

var path = require('path');
module.exports = {
  entry: './src/entry1.js',
  output: {
    filename: 'build1.js',
    path: path.resolve(__dirname, 'dist')
  }
};
