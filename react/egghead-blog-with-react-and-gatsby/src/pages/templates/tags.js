import React from 'react'
import Link from 'gatsby-link'

const Tags = ({ pathContext }) => {
  const { posts, tagName } = pathContext
  
  if (posts) {
    return (
      <div>
        <span>
          Posts about {tagName}:
        </span>

        <ul>
          {posts.map(post => {
            return (
              <li key={post.frontmatter.title}>
                <Link to={post.frontmatter.path}>
                  {post.frontmatter.title}
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
    )
  }
}

export default Tags
