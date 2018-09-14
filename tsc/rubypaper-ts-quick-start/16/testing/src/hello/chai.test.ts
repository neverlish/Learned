// 16-2-2 모카의 TDD와 BDD 스타일에 대한 이해 - 카이가 제공하는 어설션을 사용해 테스트하기 - 카이의 어설션 사용에 대한 테스트

import * as mocha from 'mocha';
import * as chai from 'chai';

var assert = chai.assert;
var should = chai.should();
var expect = chai.expect;
var fruit = 'apple',
    fruits = { favorite: ['apple', 'banana', 'mango']};

describe('chai', () => {
  it('assert test', () => {
    assert.typeOf(fruit, 'string');
    assert.typeOf(fruit, 'string', 'fruit의 타입은 string입니다.');
    assert.equal(fruit, 'apple', 'fruit 값은 apple입니다.');
    assert.lengthOf(fruit, 5, 'fruit 값의 길이는 5입니다.');
    assert.lengthOf(fruits.favorite, 3, 'fruits.favorite의 요소 개수는 3개입니다.');
  });

  it('expect test', () => {
    expect(fruit).to.be.a('string');
    expect(fruit).to.equal('apple');
    expect(fruit).to.have.lengthOf(5);
    expect(fruits).to.have.property('favorite').with.lengthOf(3);
  });

  it('should test', () => {
    fruit.should.be.a('string');
    fruit.should.equal('apple');
    fruit.should.have.lengthOf(5);
    fruits.should.have.property('favorite').with.lengthOf(3);
  });
});
