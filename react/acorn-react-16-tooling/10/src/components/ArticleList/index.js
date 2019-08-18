import React from 'react';
import Link from 'gatsby-link';

export default (title) => ({ data: { allArticlesJson: { edges } } }) => (
  <div>
    <h1>{title}</h1>
    <Link to='/'>Home</Link>
    <ul>
      {edges.map(({ node: { title } }) => (
        <li key={title}>{title}</li>
      ))}
    </ul>
  </div>
)