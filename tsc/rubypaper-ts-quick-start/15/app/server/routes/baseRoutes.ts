// 15-3-2 라우팅 처리 클래스의 개발 - 기본 라우트 클래스 정의 - 기분 라우트 클래스

import { Request, Response } from 'express';

export class BaseRoute {
  protected title: string;
  private scripts: string[];

  constructor() {
    this.title = '타입스크립트 기반 서버';
  }

  public addScript(src: string): BaseRoute {
    this.scripts.push(src);
    return this;
  }

  public render(req: Request, res: Response, view: string, options?: Object) {
    // 기본 URL 주소를 설정함
    res.locals.BASE_URL = '/';

    // 스크립트를 추가함
    res.locals.scripts = this.scripts;

    // 페이지 제목을 추가함
    res.locals.title = this.title;

    // 뷰를 렌더링
    res.render(view, options);
  }
}
