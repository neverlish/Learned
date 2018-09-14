// 08-2-6 브라우저에서 네임스페이스의 모듈 호출 - Validator 네임스페이스(문자열 검증기 모듈을 포함)

/// <reference path="number-validator.ts" />

namespace Validator {
  export class StringValidator {
    isString(s: any): boolean {
      if (typeof s === 'string' || s instanceof String) {
        return true;
      } else {
        return false;
      }
    }
  }
}

let stringValidator = new Validator.StringValidator();
let numberValidator = new Validator.NumberValidator();
console.log('string : ' + stringValidator.isString('hello')); // string : true
console.log('number : ' + numberValidator.isNumeric(123)); // number : true
