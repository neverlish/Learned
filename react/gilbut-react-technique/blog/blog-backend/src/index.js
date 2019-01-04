require('dotenv').config();

const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const mongoose = require('mongoose');
const session = require('koa-session');
const path = require('path');
const serve = require('koa-static');

const staticPath = path.join(__dirname, '../../blog-frontend/build');

const ssr = require('./ssr');

const {
  PORT: port = 4000,
  MONGO_URI: mongoURI,
  COOKIE_SIGN_KEY: signKey
} = process.env;

mongoose.Promise = global.Promise;
mongoose.connect(mongoURI).then(() => {
  console.log('connected to mongodb');
}).catch((e) => {
  console.log(e);
});

const api = require('./api');

const app = new Koa();
const router = new Router();

router.use('/api', api.routes());
router.get('/', ssr);

app.use(bodyParser());

const sessionConfig = {
  maxAge: 86400000
};

app.use(session(sessionConfig, app));
app.keys = [signKey];

app.use(router.routes()).use(router.allowedMethods());
app.use(serve(staticPath)); // 주의: serve가 ssr 전에 와야 합니다.
app.use(ssr);

app.listen(port, () => {
  console.log('listening to port', port);
});
