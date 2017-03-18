import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { MyPage } from '../pages/my-page/my-page';
import { YourPage } from '../pages/your-page/your-page';
import { Cat } from '../pages/cat/cat';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    MyPage,
    YourPage,
    Cat
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    MyPage,
    YourPage,
    Cat
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
