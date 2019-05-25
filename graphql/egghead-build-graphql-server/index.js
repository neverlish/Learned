'use strict';

const { graphql, buildSchema } = require('graphql');

const schema = buildSchema(`
  type Query {
    id: ID,
    title: String,
    duration: Int,
    watched: Boolean
  }
  type Schema {
    query: Query
  }
`);

const resolvers = {
  id: () => '1',
  title: () => 'bar',
  duration: () => 180,
  watched: () => true,
};

const query = `
  query myFirstQuery {
    id
    title
    duration
    watched
  }
`;

graphql(schema, query, resolvers)
  .then((result) => console.log(result))
  .catch((error) => console.log(error)); // { data: { id: '1', title: 'bar', duration: 180, watched: true } }
