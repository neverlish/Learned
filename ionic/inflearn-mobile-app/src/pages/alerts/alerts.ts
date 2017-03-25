import { Component } from '@angular/core';
import { AlertController } from 'ionic-angular';

@Component({
  templateUrl: 'alerts.html',
})

export class AlertsPage {
  constructor(public alertCtrl: AlertController) {

  }

  showBasicAlert() {
    let alert = this.alertCtrl.create({
      title: 'Basic Alert',
      subTitle: 'This is an ui component called a basic alert',
      buttons: ['OK'],
    });
    alert.present();
  }

  showPromptAlert() {
    let prompt = this.alertCtrl.create({
      title: 'Login',
      message: 'Enter your password',
      inputs: [
        {
          name: 'password',
          placeholder: 'Input your password'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {

          }
        },
        {
          text: 'Next',
          handler: data => {
            console.log(data['password']);
          }
        }
      ]
    });
    prompt.present();
  }

  showConfirmationAlert() {

  }

  showRadioAlert() {
    let alert = this.alertCtrl.create();
    alert.setTitle('Choose your location');
    alert.addInput({
      type: 'radio',
      label: 'Seoul',
      value: 'seoul',
      checked: true,
    });
    alert.addInput({
      type: 'radio',
      label: 'Daejeon',
      value: 'daejeon',
    });
    alert.addInput({
      type: 'radio',
      label: 'Daegu',
      value: 'daegu',
    });
    alert.addButton({
      text: 'OK',
      handler: data => {
        console.log(data);
      }
    });
    alert.present();
  }

  showCheckboxAlert() {

  }
}
