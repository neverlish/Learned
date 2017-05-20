import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public person = {
    "gender": "male",
    "name": {
      "title": "mr",
      "first": "konrad",
      "last": "mann"
    },
    "email": "konrad.mann@example.com",
    "phone": "0815-5579155",
    "picture": {
      "large": "https://randomuser.me/api/portraits/men/36.jpg",
      "medium": "https://ramdomuser.me/api/portraits/med/men/36.jpg",
      "thumbnail": "https://ramdomuser.me/api/portraits/thumb/men/36.jpg"
    }
  };
  constructor(public navCtrl: NavController) {

  }

}
