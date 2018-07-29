const resolvers = {
  Subscription: {
    DriverSubscription: {
      subscribe: (_, __, { pubSub }) => {
        return pubSub.asyncIterator('driverUpdate');
      }
    }
  }
};

export default resolvers;
