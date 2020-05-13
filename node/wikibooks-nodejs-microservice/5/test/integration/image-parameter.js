const chai = require('chai');
const http = require('chai-http');
const tools = require('../tools');

chai.use(http);

describe('The image parameter', () => {
  beforeEach((done) => {
    chai
      .request(tools.service)
      .delete('/uploads/test_image_upload.png')
      .end(() => {
        return done();
      });
  });

  it('should reply 403 fro non image extension', (done) => {
    chai
      .request(tools.service)
      .get('/uploads/test_image_paramter.txt')
      .end((err, res) => {
        chai.expect(res).to.have.status(403);

        return done();
      });
  });

  it('should reply 404 for non image existence', (done) => {
    chai
      .request(tools.service)
      .get('/uploads/test_image_parameter.png')
      .end((err, res) => {
        chai.expect(res).to.have.status(404);

        return done();
      });
  });
});