export const resolvers = {
  Query: {
    hello(root, {msg}, context, info) {
      return msg;
    }
  }
}
