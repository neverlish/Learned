import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the DetailPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-detail',
  templateUrl: 'detail.html',
})
export class DetailPage {
  public user = this.navParams.data;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    setTimeout(() => {
      this.navCtrl.pop()
    }, 2000);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailPage');
  }

}
