// 15-3-1 Node.js 기반의 서버 개발 - Node.js 서버 만들기 - 서버 파일

import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import * as express from 'express';
import * as logger from 'morgan';
import * as path from 'path';
import errorHandler = require('errorhandler');
import methodOverride = require('method-override');
import { AppRoutes } from './routes/appRoutes';

export class Server {
  public app: express.Application;

  public static bootstrap(): Server {
    return new Server();
  }

  constructor() {
    this.app = express();
    this.config();
    this.routes();
  }

  public config() {
    this.app.use(express.static(path.join(__dirname, '../client')));
    this.app.set('views', path.join(__dirname, '../server/views'));
    this.app.set('view engine', 'ejs');
    this.app.use(logger('dev'));
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({
      extended: true
    }));
    this.app.use(cookieParser('HELLO_TYPESCRIPT'));
    this.app.use(methodOverride());

    this.app.use(function (err: any, req: express.Request, res: express.Response, next: express.NextFunction) {
      err.status = 404;
      next(err);
    });
    this.app.use(errorHandler());
  }

  private routes() {
    let router: express.Router;
    router = express.Router();
    AppRoutes.create(router);
    this.app.use(router);
  }
}

