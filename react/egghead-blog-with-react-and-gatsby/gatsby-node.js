const path = require('path')

const createTagPages = (createPage, posts) => {
  const tagPageTemplate = path.resolve(`src/pages/templates/tags.js`)
  const allTagsTemplage = path.resolve(`src/pages/templates/all-tags.js`)

  const postsByTags = {}

  posts.forEach(({ node }) => {
    if (node.frontmatter.tags) {
      node.frontmatter.tags.forEach(tag => {
        if (!postsByTags[tag]) {
          postsByTags[tag] = []
        }

        postsByTags[tag].push(node)
      })
    }
  })

  const tags = Object.keys(postsByTags)

  createPage({
    path: '/tags',
    component: allTagsTemplage,
    context: {
      tags: tags.sort()
    }
  })

  tags.forEach(tagName => {
    const posts = postsByTags[tagName]

    createPage({
      path: `/tags/${tagName}`,
      component: tagPageTemplate,
      context: {
        posts,
        tagName
      }
    })
  })
}

exports.createPages = ({ boundActionCreators, graphql }) => {
  const { createPage } = boundActionCreators
  const blogPostTemplate = path.resolve(`src/pages/templates/blog-post.js`)

  return graphql(`{
    allMarkdownRemark {
      edges {
        node {
          html
          id
          frontmatter {
            date
            path
            title
            excerpt
            tags
          }
        }
      }
    }
  }`).then(result => {
    if (result.erors) {
      return Promise.reject(result.errors)
    }
    const posts = result.data.allMarkdownRemark.edges

    createTagPages(createPage, posts)

    posts.forEach(({node}, index) => {
      createPage({
        path: node.frontmatter.path,
        component: blogPostTemplate,
        context: {
          prev: index === 0 ? null : posts[index - 1].node,
          next: index === (posts.length - 1) ? null : posts[index + 1].node
        }
      })
    })
  })
}
