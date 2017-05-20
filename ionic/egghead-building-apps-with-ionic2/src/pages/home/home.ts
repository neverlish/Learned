import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public people = [
    {
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
    },
    {
      "gender": "female",
      "name": {
        "title": "mrs",
        "first": "hazel",
        "last": "anderson"
      },
      "email": "hazel.anderson@example.com",
      "phone": "(065)-994-1587",
      "picture": {
        "large": "https://randomuser.me/api/portraits/women/1.jpg",
        "medium": "https://ramdomuser.me/api/portraits/med/women/1.jpg",
        "thumbnail": "https://ramdomuser.me/api/portraits/thumb/women/1.jpg"
      }
    }
  ];
  public shouldReorder = false;
  constructor(public navCtrl: NavController) {

  }
  toggleReorder() {
    this.shouldReorder = !this.shouldReorder;
  }
}
