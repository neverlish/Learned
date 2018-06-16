import Product from './models/product'


export const resolvers = {
  Query: {
    async allProduct() {
      return await Product.find()
    }
  },
  Mutation: {
    async createProduct(_, {input}) {
      return await Product.create(input);
    }
  }
}
