import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Cat } from '../cat/cat';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  myName: string = "Jinho Hyeon";
  myAge: number = 30;
  constructor(public navCtrl: NavController) {

  }
}
