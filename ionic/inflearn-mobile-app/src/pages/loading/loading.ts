import { Component } from '@angular/core';
import { LoadingController } from 'ionic-angular';

@Component({
  templateUrl: 'loading.html',
})

export class LoadingPage {
  constructor(public loadingCtrl: LoadingController) {

  }

  presentLoading() {
    let loader = this.loadingCtrl.create({
      spinner: 'bubbles',
      content: 'Please wait...',
      duration: 3000,
    });
    loader.present();
    loader.dismiss();
  }
}
