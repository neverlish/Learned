// 15-2-2 프로젝트 관련 패키지 설치와 설정 - 북마크 애플리케이션에서 사용할 URL 검증 모듈

export function isURL(url: string) {
  return /^(http|https):\/\/[^ "]+$/.test(url);
}
