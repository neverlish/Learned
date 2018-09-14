// 16-2-2 모카의 TDD와 BDD 스타일에 대한 이해 - Hello 테스트 코드 작성 - Hello 테스트

import * as mocha from 'mocha';

import * as chai from 'chai';
import hello from './hello';

describe('hello 테스트', () => {
  it('동일할 문자를 반환하는지를 테스트', () => {
    chai.expect(hello('world')).to.be.equals('world');
  });
});
