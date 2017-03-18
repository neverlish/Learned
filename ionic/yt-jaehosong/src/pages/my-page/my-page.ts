import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  template: `
    <h2>This is my page</h2>
    <button ion-button (click)="onBack()">Back</button>
  `
})

export class MyPage {
  constructor( private navCtrl : NavController ) {

  }
  onBack() {
    this.navCtrl.pop();
  }
}
