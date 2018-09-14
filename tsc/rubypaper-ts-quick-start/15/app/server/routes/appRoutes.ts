// 15-3-2 라우팅 처리 클래스의 개발 - 라우터 모듈을 활용한 라우팅 클래스 추가 - 애플리케이션 라우트 클래스

import { NextFunction, Request, Response, Router } from 'express';
import { BaseRoute } from './../routes/baseRoutes';
import { Index } from './../controllers/index';

export class AppRoutes extends BaseRoute {
  constructor() {
    super();
  }

  public static create(router: Router) {
    router.get('/', (req: Request, res: Response, next: NextFunction) => {
      new Index().renderView(req, res, next);
    });

    router.post('/add', (req: Request, res: Response, next: NextFunction) => {
      new Index().add(req, res, next);
    });
  }
}
