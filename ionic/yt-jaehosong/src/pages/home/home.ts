import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { MyPage } from '../my-page/my-page';
import { YourPage } from '../your-page/your-page';

@Component({
  selector: 'page-home',
  template: `
    <button ion-button (click)="onClick()">My Page</button>
    <button ion-button (click)="onClickYourPage()">Your Page</button>
  `
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }
  onClick() {
    this.navCtrl.push( MyPage );
  }

  onClickYourPage() {
    this.navCtrl.push( YourPage );
  }

}
