// 16-3-2 네임스페이스를 고려한 테스트 - Validator 네임스페이스에 대한 테스트 코드

import * as mocha from 'mocha';

import { Validator } from './validator';
import chai = require('chai');
let expect = chai.expect;

describe('문자열 검증하기', () => {
  it('URL - 주소에 대한 true 테스트', () => {
    expect(Validator.isURL('http://books.google.com')).to.be.true;
  });

  it('URL - 형식에 대한 false 테스트', () => {
    expect(Validator.isURL('books.google.com')).to.be.false;
    expect(Validator.isURL('http:books.google.com')).to.be.false;
    expect(Validator.isURL('http:\\books.google.com')).to.be.false;
  });
});

describe('숫자 검증하기', () => {
  it('폰 번호 - 번호에 대한 true 테스트', () => {
    expect(Validator.isPhone('010-1111-1111')).to.be.true;
    expect(Validator.isPhone('010-111-1111')).to.be.true;
    expect(Validator.isPhone('016-111-1111')).to.be.true;
    expect(Validator.isPhone('019-111-1111')).to.be.true;
  });

  it('폰 번호 - 형식에 대한 false 테스트', () => {
    expect(Validator.isPhone('0123-111-1111')).to.be.false;
    expect(Validator.isPhone('010-11-1111')).to.be.false;
    expect(Validator.isPhone('010-11-11111')).to.be.false;
  });

  it('폰 번호 - 앞자리에 대한 false 테스트', () => {
    expect(Validator.isPhone('012-1111-1111')).to.be.false;
    expect(Validator.isPhone('013-1111-1111')).to.be.false;
    expect(Validator.isPhone('014-1111-1111')).to.be.false;
    expect(Validator.isPhone('015-1111-1111')).to.be.false;
  });
});
