const LambdaTester = require('lambda-tester');
var expect = require('chai').expect;
const myHandler = require('../code/calculator').handler;

describe('myHandler', function () {
  context('긍정 테스트 케이스', function () {
    it('테스트 성공', function () {
      return LambdaTester(myHandler)
        .event({
          num1: 3,
          num2: 2,
          operand: '+'
        })
        .expectResult(function (result) {
          expect(result).to.equal(5);
        })
    });
  });

  context('부정 테스트 케이스 - 유효하지 않은 숫자', function () {
    it('테스트 실패', function () {
      return LambdaTester(myHandler)
        .event({
          num1: 'num',
          num2: 2,
          operand: '+'
        })
        .expectError(function (err) {
          expect(err.message).to.equal('유효하지 않은 숫자!');
        })
    });
  });

  context('부정 테스트 케이스 - 나눗셈 제수 0', function () {
    it('테스트 실패', function () {
      return LambdaTester(myHandler)
        .event({
          num1: 2,
          num2: 0,
          operand: 'div'
        })
        .expectError(function (err) {
          expect(err.message).to.equal('나눗셈의 제수는 0이 될 수 없다.');
        })
    });
  });

  context('부정 테스트 케이스 - 유효하지 않은 연산자', function () {
    it('테스트 실패', function () {
      return LambdaTester(myHandler)
        .event({
          num1: 2,
          num2: 0,
          operand: '='
        })
        .expectError(function (err) {
          expect(err.message).to.equal('유효하지 않은 연산자');
        })
    });
  });
});