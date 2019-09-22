import { Component } from '@angular/core';
import { ModalController, NavParams, ViewController } from 'ionic-angular';

class Email {
  address: string;
  body: string;

  constructor(addr, body) {
    this.address = addr;
    this.body = body;
  }
}

@Component({
  templateUrl: 'modals.html',
})

export class ModalsPage {
  emails: Array<Email>;

  constructor(public modalCtrl: ModalController) {
    this.emails = [
      { address: 'john@gmail.com', body: 'I think it was a wonderful vacataion. Do you think..?' },
      { address: 'jake@gmail.com', body: 'Hi' },
      { address: 'sarah@gmail.com', body: "What's up?" },
    ];
  }

  openModalPage(email) {
    let modal = this.modalCtrl.create(ModalDetailPage, {
      email: email,
    });
    modal.present();
  }
}

@Component({
  template: `
    <ion-header>
      <ion-toolbar>
        <ion-title>Detail</ion-title>
        <ion-buttons start>
          <button ion-button (click)="dismiss()">
            <span ion-text color="primary">Cancel</span>
          </button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <h1>{{email.address}}</h1>
      <p>{{email.body}}</p>
    </ion-content>
  `,
})

export class ModalDetailPage {
  email: Email;

  constructor(public navParams: NavParams, public viewCtrl: ViewController) {
    this.email = this.navParams.get('email');
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}
