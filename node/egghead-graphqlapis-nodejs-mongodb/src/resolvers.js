import Product from './models/product'

const products = [{
  _id: '12',
  name: 'GraphQL course',
  qty: 1
}, {
  _id: '13',
  name: 'Nodejs course',
  qty: 1
}]

export const resolvers = {
  Query: {
    allProduct() {
      return products
    }
  },
  Mutation: {
    async createProduct(_, {input}) {
      return await Product.create(input);
    }
  }
}
