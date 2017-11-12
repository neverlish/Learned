var routes = require('../routes'),
    config = require('../config'),
    nodeunit = require('nodeunit'),
    Request = require('./request'),
    Response = require('./response');

exports.indexRouteTest = function (test) {
  var res = new Response();
  test.equal(res.view, undefined);
  routes.index({}, res);
  test.equal(res.view, 'index');
  test.equal(res.viewData.title, 'Index');
  test.done();
}
