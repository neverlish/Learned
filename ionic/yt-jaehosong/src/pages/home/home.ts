import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Cat } from '../cat/cat';

@Component({
  selector: 'page-home',
  template: `
    <h1>Hello world!</h1>
    <button (click)="onClickCat()">Cat</button>
  `
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }
  onClickCat() {
    this.navCtrl.push(Cat);
  }
}
