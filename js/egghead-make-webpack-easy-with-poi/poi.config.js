const BundleAnalyzer = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = options => ({
  webpack(config) {
    if (options.analyze) {
      config.plugins.push(
        new BundleAnalyzer()
      )
    }
    
    config.module.rules.push({
      test: /\.md$/,
      loaders: [
        'babel-loader',
        'react-markdown-loader'
      ]
    })
    return config
  }
})
