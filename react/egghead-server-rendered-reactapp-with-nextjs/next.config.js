const webpack = require('webpack');

require('dotenv').config();
module.exports = {
  webpack: config => {
    config.plugins.push(
      new webpack.EnvironmentPlugin(['BLOGGER_URL', 'BLOGGER_API_KEY'])
    );
    return config;
  }
};