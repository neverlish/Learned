import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  myPets = [
    {
      kind: 'Cat',
      name: 'Nabi',
      color: 'white'
    },
    {
      kind: 'Dog',
      name: 'Happy',
      color: 'brown'
    }
  ]
  myPets2 = {
    nabi: {
      kind: 'Cat',
      color: 'white'
    },
    happy : {
      kind: 'Dog',
      color: 'brown'
    }
  }
  constructor(public navCtrl: NavController) {

  }
  get pets() {
    return Object.keys(this.myPets2);
  }
}
