var config = {
  port: 3000,
  secret: 'secret',
  redisUrl: 'redis://localhost',
  redisPort: 6379,
  redisHost: 'localhost',
  routes: {
    login: '/login',
    logout: '/logout',
    chat: '/chat',
    facebookAuth: '/auth/facebook',
    facebookAuthCallback: '/auth/facebook/callback',
    googleAuth: '/auth/google',
    googleAuthCallback: '/auth/google/callback'
  },
  host: 'http://localhost:3000',
  facebook: {
    appID: process.env.FB_DEV_APP_ID,
    appSecret: process.env.FB_DEV_APP_SECRET_CODE
  },
  google: {
    clientID: process.env.GOOGLE_DEV_CLIENT_ID,
    clientSecret: process.env.GOOGLE_DEV_CLIENT_SECRET_CODE
  },
  crypto: {
    workFactor: 5000,
    keylen: 32,
    randomSize: 256
  }
};

module.exports = config;
