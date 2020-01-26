module.exports = {
  server_port: 3000,
  db_url: 'mongodb://localhost:27017/shopping',
  db_schemas: [
    {file: './user_schema', collection: 'users5', schemaName: 'UserSchema', modelName: 'UserModel'}
  ],
  route_info: [
  ]
}
