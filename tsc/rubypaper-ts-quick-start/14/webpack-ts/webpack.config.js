// 14-1-4 타입스크립트 로더 설정과 웹팩 실행 - 타입스크립트 로더 - 타입스크립트 로더를 웹팩 설정 파일에 추가하기

var path = require('path');

module.exports = {
  entry: './src/entry1.ts',
  output: {
    filename: 'build1.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    loaders: [{
      test: /\.tsx?/,
      loader: 'ts-loader',
      options: {
        transpileOnly: true
      }
    }]
  }
};
