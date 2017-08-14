module.exports = {
  server_port: 3000,
  db_url: 'mongodb://localhost:27017/shopping',
  db_schemas: [
    {file: './user_schema', collection: 'users6', schemaName: 'UserSchema', modelName: 'UserModel'},
    {file: './coffeeshop_schema', collection: 'coffeeshop', schemaName: 'CoffeeShopSchema', modelName: 'CoffeeShopModel'}
  ],
  route_info: [
    {file: './coffeeshop', path: '/process/addcoffeeshop', method: 'add', type: 'post'},
    {file: './coffeeshop', path: '/process/listcoffeeshop', method: 'list', type: 'post'},
    {file: './coffeeshop', path: '/process/nearcoffeeshop', method: 'findNear', type: 'post'},
    {file: './coffeeshop', path: '/process/withincoffeeshop', method: 'findWithin', type: 'post'},
    {file: './coffeeshop', path: '/process/circlecoffeeshop', method: 'findCircle', type: 'post'}
  ],
  facebook: {
    clientID: '1116768055126353',
    clientSecret: '64251d71f6c69df3090088c84e7f7b20',
    callbackURL: '/auth/facebook/callback'
  }
}
