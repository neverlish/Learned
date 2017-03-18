import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  template: `
    <h2>This is my cat</h2>
    <button (click)="onBack()">Back</button>
  `
})

export class Cat {
  constructor( private navCtrl: NavController ) {

  }
  onBack() {
    this.navCtrl.pop();
  }
  ionViewDidLoad() {
    alert('Hello');
  }
}
