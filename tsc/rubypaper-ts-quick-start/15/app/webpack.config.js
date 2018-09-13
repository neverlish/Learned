// 15-4-3 웹팩을 이용한 북마크 애플리케이션 번들링 - 웹팩 환경 섫정 파일

var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'source-map',
  entry: ['./client/js'],
  output: {
    path: path.resolve(__dirname, 'dist/client/js'),
    filename: 'app.js'
  },
  module: {
    loaders: [{
      test: /\.tsx?/,
      loader: 'ts-loader',
      options: {
        transpileOnly: true
      }
    }]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  ],
  resolve: {
    extensions: ['.ts', '.js']
  }
};
