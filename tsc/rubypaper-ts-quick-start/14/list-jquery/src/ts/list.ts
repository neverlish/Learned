// 14-2-1 jQuery 기반 프로젝트의 구성과 실습 - 목록 모듈

import * as _ from 'underscore';

export class Item {
  constructor(public name: string, public point: number) {

  }
}

export class RecommendedPlaces {
  getList(items: Array<Item>): string {
    let arr = [];
    for (let i = 0; i < items.length; i++) {
      arr.push('<li><b>' + items[i].name + '</b> : ' + items[i].point + ' 점</li>');
    }
    return arr.join('');
  }

  getBestPlace(items: Array<Item>): string {
    let bestPlace = _.max(items, function(i) { return i.point; });
    return bestPlace.name;
  }
}
