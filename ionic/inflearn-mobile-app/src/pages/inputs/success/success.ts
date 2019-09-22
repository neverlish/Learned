import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';

@Component({
  templateUrl: 'success.html',
})

export class SuccessPage {
  username: string = '';
  constructor(public navParams: NavParams) {
    this.username = this.navParams.get('username');
    console.log(this.username);
  }
}
