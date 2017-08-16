module.exports = {
  server_port: 3000,
  db_url: 'mongodb://localhost:27017/shopping',
  db_schemas: [
    {file: './user_schema', collection: 'users6', schemaName: 'UserSchema', modelName: 'UserModel'},
    {file: './device_schema', collection: 'devices', schemaName: 'DeviceSchema', modelName: 'DeviceModel'}
  ],
  route_info: [
    {file: './user', path: '/process/listuser', method: 'listuser', type: 'post'},
    {file: './device', path: '/process/adddevice', method: 'adddevice', type: 'post'},
    {file: './device', path: '/process/listdevice', method: 'listdevice', type: 'post'}
  ],
  facebook: {
    clientID: '1116768055126353',
    clientSecret: '64251d71f6c69df3090088c84e7f7b20',
    callbackURL: '/auth/facebook/callback'
  }
}
