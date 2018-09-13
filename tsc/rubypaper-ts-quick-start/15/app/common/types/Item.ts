// 15-2-2 프로젝트 관련 패키지 설치와 설정 - 클라이언트와 서버에서 공통으로 사용할 구조 타입 모듈(북마크 정보의 구조 정의)

interface Item {
  title: string;
  intro: string;
  url: string;
}

export default Item;
