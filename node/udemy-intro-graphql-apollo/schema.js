import { makeExecutableSchema, addMockFunctionsToSchema } from 'graphql-tools';
import resolvers from './resolvers';

const typeDefs = `
type Author {
  id: Int
  age: Int
  name: String
  books: [String]
}

type Query {
  authors: [Author]
  author(id: Int): Author
}
`;

const schema = makeExecutableSchema({ typeDefs, resolvers });

export default schema;
