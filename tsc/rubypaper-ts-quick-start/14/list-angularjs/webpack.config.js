// 14-2-1 jQuery 기반 프로젝트의 구성과 실습 - 웹팩 설정 파일

var path = require('path');
var webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  devtool: 'sourcemap',
  entry: ['./src/ts/app.ts'],
  output: {
    path: path.resolve(__dirname, 'dist/js'),
    filename: 'app.js'
  },
  module: {
    loaders: [{
      test: /\.tsx?/,
      loader: 'ts-loader'
    }]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new HtmlWebpackPlugin({
      title: 'Custom template',
      template: './src/ts/index.html'
    })
  ],
  resolve: {
    extensions: ['.ts', '.js']
  }
};
