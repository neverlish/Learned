// 08-2-6 브라우저에서 네임스페이스의 모듈 호출 - Validator 네임스페이스(숫자 검증기 모듈을 포함)

namespace Validator {
  export class NumberValidator {
    isNumeric(s: any): boolean {
      if (typeof s === 'number' || s instanceof Number) {
        return true;
      } else {
        return false;
      }
    }
  }
}
