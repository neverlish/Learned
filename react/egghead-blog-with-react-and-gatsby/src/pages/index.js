import React from 'react'
import Link from 'gatsby-link'

const IndexPage = ({data}) => {
  const {edges: posts} = data.allMarkdownRemark
  return (
    <div>
      {posts.map(({node: post}) => {
        const {frontmatter, id} = post
        return (
          <div key={id}>
            <h2>
              <Link to={frontmatter.path}>
                {frontmatter.title}
              </Link>
            </h2>
            <p>{frontmatter.date}</p>
            <p>{frontmatter.excerpt}</p>
            <ul>
              {frontmatter.tags.map(tag => {
                return (
                  <li key={tag}>
                    <Link to={`/tags/${tag}`}>
                      {tag}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>
        )
      })}
    </div>
  )
}

export const query = graphql`
  query IndexQuery {
    allMarkdownRemark {
      totalCount
      edges {
        node {
          id
          frontmatter {
            title
            date
            path
            tags
            excerpt
          }
        }
      }
    }
  }
`

export default IndexPage
