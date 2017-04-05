// node_modules/.bin/mocha utils.spec.js

const utils = require('./utils');
const should = require('should');

describe('utils.js 모듈은', () => {
  it('문자열의 첫번째 문자를 대문자로 변환한다', () => {
    const result = utils.capitalize('hello');
    result.should.be.equal(result, 'Hello');
  })
})
