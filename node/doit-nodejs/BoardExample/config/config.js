module.exports = {
  server_port: 3000,
  db_url: 'mongodb://localhost:27017/shopping',
  db_schemas: [
    {file: './user_schema', collection: 'users6', schemaName: 'UserSchema', modelName: 'UserModel'},
    {file: './post_schema', collection: 'posts', schemaName: 'PostSchema', modelName: 'PostModel'}
  ],
  route_info: [
    {file: './post', path: '/process/addpost', method: 'addpost', type: 'post'},
    {file: './post', path: '/process/showpost/:id', method: 'showpost', type: 'get'}
  ],
  facebook: {
    clientID: '1116768055126353',
    clientSecret: '64251d71f6c69df3090088c84e7f7b20',
    callbackURL: '/auth/facebook/callback'
  }
}
