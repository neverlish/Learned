const { ApolloServer } = require('apollo-server');

const typeDefs = `
  type Query {
    totalPhotos: Int!
  }
  type Mutation {
    postPhoto(name: String!, description: String): Boolean!
  }
`

var photos = []

const resolvers = {
  Query: {
    totalPhotos: () => photos.length
  },
  Mutation: {
    postPhoto(parent, args) {
      photos.push(args)
      return true
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers
})

server
  .listen()
  .then(({ url }) => console.log(`GraphQL Service runnin on ${url}`))