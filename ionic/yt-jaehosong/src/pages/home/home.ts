import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Cat } from '../cat/cat';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  Animal = {
    Cat: 2
  };
  constructor(public navCtrl: NavController) {

  }
}
