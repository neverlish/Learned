// 14-2-2 AngularJS 기반 프로젝트의 구성과 실습 - 항목 모듈과 장소 추천 모듈

import * as _ from 'underscore';

export class Item {
  constructor(public name: string, public point: number) {

  }
}

export class RecommendedPlaces {
  getBestPlace(items: Array<Item>): string {
    let bestPlace = _.max(items, function(i) { return i.point; });
    return bestPlace.name;
  }
}

