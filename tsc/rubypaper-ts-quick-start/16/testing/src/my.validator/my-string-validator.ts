// 16-3-2 네임스페이스를 고려한 테스트 - 문자열 검증 모듈을 포함하는 네임스페이스(My.StringValidator)

export namespace My.StringValidator {
  export function isURL(url: string) {
    return /^(http|https):\/\/[^ "]+$/.test(url);
  }
}
