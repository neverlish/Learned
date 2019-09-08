const chai = require('chai');
const http = require('chai-http');
const tools = require('../tools');

chai.use(http);

describe('Statistics', () => {
  it('should return an object with total, size, last_used and uptime', (done) => {
    chai
      .request(tools.service)
      .get('/stats')
      .end((err, res) => {
        chai.expect(res).to.have.status(200);
        chai.expect(res.body).to.have.property('total');
        chai.expect(res.body).to.have.property('size');
        chai.expect(res.body).to.have.property('last_used');
        chai.expect(res.body).to.have.property('uptime');

        return done();
      });
  });
});