import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  urlFall: string = 'assets/fall.png';
  urlImages: Array<string> = [
    'assets/fall.png',
    'assets/fall.jpg'
  ]
  constructor(public navCtrl: NavController) {
    // setTimeout(() =>
    //   this.urlFall = 'assets/fall.jpg'
    // , 1000);
    let index = 0;
    setInterval(() => {
      index = index == 0 ? 1 : 0;
      this.urlFall = this.urlImages[index];
    }, 1000);
  }
}
