import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { ActionSheetPage } from '../pages/action-sheet/action-sheet';
import { AlertsPage } from '../pages/alerts/alerts';
import { ButtonsPage } from '../pages/buttons/buttons';
import { CardsPage } from '../pages/cards/cards';
import { DatetimePage } from '../pages/datetime/datetime';
import { FabPage } from '../pages/fab/fab';
import { InputsPage } from '../pages/inputs/inputs';
import { ListPage } from '../pages/list/list';
import { LoadingPage } from '../pages/loading/loading';
import { ModalsPage } from '../pages/modals/modals';
import { PopoverPage } from '../pages/popovers/popovers';
import { RangePage } from '../pages/range/range';
import { SearchbarPage } from '../pages/searchbar/searchbar';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = ActionSheetPage;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Action Sheet', component: ActionSheetPage },
      { title: 'Alerts', component: AlertsPage },
      { title: 'Buttons', component: ButtonsPage },
      { title: 'Cards', component: CardsPage },
      { title: 'Datetime', component: DatetimePage },
      { title: 'Fab', component: FabPage },
      { title: 'Inputs', component: InputsPage },
      { title: 'List', component: ListPage },
      { title: 'Loading', component: LoadingPage },
      { title: 'Modals', component: ModalsPage },
      { title: 'Popovers', component: PopoverPage },
      { title: 'Range', component: RangePage },
      { title: 'Searchbar', component: SearchbarPage },
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
