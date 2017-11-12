var util = require('../middleware/utilities'),
    config = require('../config'),
    nodeunit = require('nodeunit'),
    Request = require('./request'),
    Response = require('./response');

exports.requireAuthTest = nodeunit.testCase({
  setUp: function(cb) {
    this.req = new Request();
    this.res = new Response();
    this.nextExecuted = false;
    this.next = function() { this.nextExecuted = true }.bind(this);
    cb();
  },
  'Not Authenticated': function(test) {
    this.req.session.isAuthenticated = false;
    util.requireAuthentication(this.req, this.res, this.next);
    test.equal(this.res.url, config.routes.login);
    test.equal(this.nextExecuted, false);
    test.done();
  },
  'Authenticated': function(test) {
    this.req.session.isAuthenticated = true;
    test.equal(this.nextExecuted, false);
    util.requireAuthentication(this.req, this.res, this.next);
    test.equal(this.res.url, '');
    test.equal(this.nextExecuted, true);
    test.done();
  }
});
