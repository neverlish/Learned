// 15-2-2 프로젝트 관련 패키지 설치와 설정 - 북마크의 구조를 정의한 인터페이스

import Item from './Item';

interface IresponseItem {
  success: boolean;
  item: Item;
}

export { IresponseItem };
