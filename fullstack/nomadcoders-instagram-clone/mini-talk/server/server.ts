import { GraphQLServer } from 'graphql-yoga';
import { prisma } from "./generated/prisma-client";

const typeDefs = `
  type Message {
    id: ID!
    text: String!
  }

  type Query {
    messages: [Message!]!
  }

  type Mutation {
    sendMessage(text: String!): Message!
  }

  type Subscription {
    newMessage: Message!
  }
`;

const resolvers = {
  Query: {
    messages: () => prisma.messages(),
  },
  Mutation: {
    sendMessage: (_, { text }) => {
      prisma.createMessage({
        text
      })
    }
  },
  Subscription: {
    newMessage: {
      subscribe: () => prisma.$subscribe.message().node(),
      resolve: payload => payload
    }
  }
}

const server = new GraphQLServer({ typeDefs, resolvers });

server.start(() => console.log('Server is running on port http://localhost:4000'));