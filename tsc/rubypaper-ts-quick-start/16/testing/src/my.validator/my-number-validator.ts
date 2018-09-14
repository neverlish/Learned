// 16-3-2 네임스페이스를 고려한 테스트 - 숫자 검증 모듈을 포함하는 네임스페이스(My.NumberValidator)

export namespace My.NumberValidator {
  export function isPhone(input: string) {
    let regex = /^01([0|1|6|7|8|9]?)-\d{3,4}-\d{4}$/;
    return regex.test(input);
  }
}
