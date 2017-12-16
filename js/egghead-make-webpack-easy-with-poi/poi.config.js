module.exports = {
  webpack(config) {
    config.module.rules.push({
      test: /\.md$/,
      loaders: [
        'babel-loader',
        'react-markdown-loader'
      ]
    })
    return config
  }
}
