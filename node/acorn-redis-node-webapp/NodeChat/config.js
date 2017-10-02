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
    facebookAuthCallback: '/auth/facebook/callback'
  },
  host: 'http://localhost:3000',
  facebook: {
    appID: process.env.FB_DEV_APP_ID,
    appSecret: process.env.FB_DEV_APP_SECRET_CODE
  }
};

module.exports = config;
