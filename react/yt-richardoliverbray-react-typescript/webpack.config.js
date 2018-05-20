const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin')
const ExtraTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: './src/index.tsx',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'awesome-typescript-loader'
      },
      {
        enforce: 'pre',
        test: /\.js$/,
        loader: 'source-map-loader'
      },
      {
        test: /\.scss$/,
        use: ExtraTextPlugin.extract({
          use: [
            {
              loader: 'css-loader',
              options: {
                minimize: true
              }
            },
            'sass-loader'
          ]
        })
      }
    ]
  },
  plugins: [
    new htmlWebpackPlugin({
      template: './index.html'
    }),
    new ExtraTextPlugin('style.css')
  ],
  devtool: 'source-map',
  resolve: {
    extensions: ['.js', '.ts', '.tsx']
  }
}
