// 15-2-2 프로젝트 관련 패키지 설치와 설정 - 북마크 애플리케이션에서 사용할 HTML 생성 모듈

import Item from './types/Item';

export function getItemTemplate(arr: Item[]): string {
  let html = [];

  for (let i = 0; i < arr.length; i++) {
    html.push(`
      <div class="col-xs-4 max50">
        <h2>${arr[i].title}</h2>
        <p>${arr[i].intro}</p>
        <p><a href=${arr[i].url} target='_blank' class='btn btn-success'>바로가기 &raquo;</a></p>
      </div>
    `);
  }

  return html.join('');
}
