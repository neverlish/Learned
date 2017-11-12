var config = {
  port: process.env.NODECHAT_PORT,
  secret: process.env.NODECHAT_SECRET,
  redisUrl: 'redis://localhost',
  redisPort: process.env.NODECHAT_REDIS_PORT,
  redisHost: process.env.NODECHAT_REDIS_HOST,
  routes: {
    login: '/login',
    logout: '/account/logout',
    chat: '/chat',
    facebookAuth: '/auth/facebook',
    facebookAuthCallback: '/auth/facebook/callback',
    googleAuth: '/auth/google',
    googleAuthCallback: '/auth/google/callback',
    register: '/account/register'
  },
  host: process.env.NODECHAT_HOST,
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
  },
  rabbitMQ: {
    URL: process.env.NODECHAT_RABBITMQ_URL,
    exchange: process.env.NODECHAT_RABBITMQ_EXCHANGE
  }
};

module.exports = config;
