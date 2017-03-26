import { Component } from '@angular/core';
import { ToastController } from 'ionic-angular';

@Component({
  templateUrl: 'toast.html',
})

export class ToastPage {
  constructor(public toastCtrl: ToastController) {

  }
  showToast(position: string) {
    let toast = this.toastCtrl.create({
      message: 'Toast message!',
      duration: 2000,
      position: position,
    });
    toast.present();
  }

  showToastWithButton() {
    let toast = this.toastCtrl.create({
      message: 'Toast message!!',
      showCloseButton: true,
      closeButtonText: 'OK',
    });
    toast.present();
  }
}
