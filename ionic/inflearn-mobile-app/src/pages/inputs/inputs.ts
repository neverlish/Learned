import { Component } from '@angular/core';
import { NavController } from 'ionic-angular'
import { SuccessPage } from './success/success';

@Component({
  templateUrl: 'inputs.html',
})

export class InputsPage {
  labelColor: string = 'primary';
  username: string = '';
  password: string = '';

  constructor(public navCtrl: NavController) {

  }

  signIn() {
    this.navCtrl.push(SuccessPage, {
      username: this.username,
    });
  }

  doBlur() {
    this.labelColor = 'danger';
  }

  doFocus() {
    this.labelColor = 'secondary';
  }
}
