// 16-3-2 네임스페이스를 고려한 테스트 - 네임스페이스를 이용해 모듈을 재노출

import * as ns from './my-string-validator';
import * as ns2 from './my-number-validator';

export namespace Validator {
  export import isURL = ns.My.StringValidator.isURL;
  export import isPhone = ns2.My.NumberValidator.isPhone;
}
