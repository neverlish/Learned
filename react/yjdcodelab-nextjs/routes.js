const routes = require('next-routes');

const router = routes().add('feed', '/feed/:feedId');

module.exports = router;