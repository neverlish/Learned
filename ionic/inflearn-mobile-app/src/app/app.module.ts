import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { ActionSheetPage } from '../pages/action-sheet/action-sheet';
import { AlertsPage } from '../pages/alerts/alerts';
import { ButtonsPage } from '../pages/buttons/buttons';
import { CardsPage } from '../pages/cards/cards';
import { BackgroundImageCardsPage } from '../pages/cards/bg-cards/bg-cards';
import { SocialCardsPage } from '../pages/cards/social-cards/social-cards';
import { DatetimePage } from '../pages/datetime/datetime';
import { FabPage } from '../pages/fab/fab';
import { InputsPage } from '../pages/inputs/inputs';
import { SuccessPage } from '../pages/inputs/success/success';
import { ListPage } from '../pages/list/list';
import { DetailPage } from '../pages/list/detail/detail';
import { LoadingPage } from '../pages/loading/loading';
import { ModalsPage, ModalDetailPage } from '../pages/modals/modals';
import { PopoverPage, PopoverDetailPage } from '../pages/popovers/popovers';
import { RangePage } from '../pages/range/range';
import { SearchbarPage } from '../pages/searchbar/searchbar';
import { SlidePage } from '../pages/slides/slides';
import { ToastPage } from '../pages/toast/toast';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    MyApp,
    ActionSheetPage,
    AlertsPage,
    ButtonsPage,
    CardsPage,
      BackgroundImageCardsPage,
      SocialCardsPage,
    DatetimePage,
    FabPage,
    InputsPage,
      SuccessPage,
    ListPage,
      DetailPage,
    LoadingPage,
    ModalsPage,
      ModalDetailPage,
    PopoverPage,
      PopoverDetailPage,
    RangePage,
    SearchbarPage,
    SlidePage,
    ToastPage,
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ActionSheetPage,
    AlertsPage,
    ButtonsPage,
    CardsPage,
      BackgroundImageCardsPage,
      SocialCardsPage,
    DatetimePage,
    FabPage,
    InputsPage,
      SuccessPage,
    ListPage,
      DetailPage,
    LoadingPage,
    ModalsPage,
      ModalDetailPage,
    PopoverPage,
      PopoverDetailPage,
    RangePage,
    SearchbarPage,
    SlidePage,
    ToastPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
