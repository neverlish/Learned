var expect = require('chai').expect;
var myLambda = require('../code/calculator');

var retError, retValue;

describe('myLambda', function () {
  context('긍정 테스트 케이스', function () {
    before('myLambda 함수 호출', function (done) {
      var event = {
        num1: 3,
        num2: 2,
        operand: '+'
      };
      var context = {
        functionName: 'calculator'
      };
      myLambda.handler(event, context, function (err, value) {
        retError = err;
        retValue = value;
        done();
      });
    });

    it('myLambda에서 오류가 반환됐는지 확인한다.', function () {
      expect(retError).to.be.a('null');
    });

    it('myLambda에서 반환된 값을 확인한다', function () {
      expect(retValue).to.equal(5);
    });
  });

  context('부정 테스트 케이스 - 유효하지 않은 숫자', function () {
    before('myLambda 함수 호출', function (done) {
      var event = {
        num1: 'num',
        num2: 2,
        operand: 'div'
      };
      var context = {
        functionName: 'calculator'
      };
      myLambda.handler(event, context, function (err, value) {
        retError = err;
        retValue = value;
        done();
      });
    });

    it('myLambda에서 오류가 반환됐는지 확인한다.', function () {
      expect(retError).to.equal('유효하지 않은 숫자!');
    });

    it('myLambda에서 반환된 값을 확인한다', function () {
      expect(retValue).to.be.an('undefined');
    });
  });

  context('부정 테스트 케이스 - 나눗셈 제수 0', function () {
    before('myLambda 함수 호출', function (done) {
      var event = {
        num1: 2,
        num2: 0,
        operand: 'div'
      };
      var context = {
        functionName: 'calculator'
      };
      myLambda.handler(event, context, function (err, value) {
        retError = err;
        retValue = value;
        done();
      });
    });

    it('myLambda에서 오류가 반환됐는지 확인한다.', function () {
      expect(retError).to.equal('나눗셈의 제수는 0이 될 수 없다.');
    });

    it('myLambda에서 반환된 값을 확인한다', function () {
      expect(retValue).to.be.an('undefined');
    });
  });

  context('부정 테스트 케이스 - 유효하지 않은 연산자', function () {
    before('myLambda 함수 호출', function (done) {
      var event = {
        num1: 2,
        num2: 0,
        operand: '='
      };
      var context = {
        functionName: 'calculator'
      };
      myLambda.handler(event, context, function (err, value) {
        retError = err;
        retValue = value;
        done();
      });
    });

    it('myLambda에서 오류가 반환됐는지 확인한다.', function () {
      expect(retError).to.equal('유효하지 않은 연산자');
    });

    it('myLambda에서 반환된 값을 확인한다', function () {
      expect(retValue).to.be.an('undefined');
    });
  });
});