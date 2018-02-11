const path = require('path');
const rootPath = path.normalize(__dirname + '/..');
const env = process.env.NODE_ENV || 'development';

const config = {
  development: {
    root: rootPath,
    app: {
      name: 'maps-api'
    },
    port: process.env.PORT || 3000,
    db: 'mongodb://localhost/maps-api-development'
  },

  test: {
    root: rootPath,
    app: {
      name: 'maps-api'
    },
    port: process.env.PORT || 3000,
    db: 'mongodb://localhost/maps-api-test'
  },

  production: {
    root: rootPath,
    app: {
      name: 'maps-api'
    },
    port: process.env.PORT || 3000,
    db: 'mongodb://localhost/maps-api-production'
  }
};

module.exports = config[env];
