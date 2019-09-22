import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';

@Component({
  templateUrl: 'detail.html',
})

export class DetailPage {
  profileImage;
  name;
  detail;

  constructor(public navParams: NavParams) {
    this.profileImage = this.navParams.get('profileImage');
    this.name = this.navParams.get('name');
    this.detail = this.navParams.get('detail');
  }
}
