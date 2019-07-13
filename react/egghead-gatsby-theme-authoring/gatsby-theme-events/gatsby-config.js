module.exports = ({ contentPath = 'data', basePath = '/' }) => ({
  plugins: [
    'gatsby-theme-ui',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: contentPath
      }
    },
    {
      resolve: 'gatsby-transformer-yaml',
      options: {
        typeName: 'Event'
      }
    }
  ]
})