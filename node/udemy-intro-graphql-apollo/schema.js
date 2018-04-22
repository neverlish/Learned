import { makeExecutableSchema, addMockFunctionsToSchema } from 'graphql-tools';
import resolvers from './resolvers';

const typeDefs = `
type Author {
  id: String
  age: Int
  name: String
  books: [String]
}

type Query {
  authors: [Author]
  author(id: String): Author
}
`;

const schema = makeExecutableSchema({ typeDefs, resolvers });

export default schema;
