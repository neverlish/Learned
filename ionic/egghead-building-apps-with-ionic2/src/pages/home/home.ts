import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { PeopleProvider } from '../../providers/people/people';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public people = this.service.getPeople();
  public shouldReorder = false;
  constructor(public navCtrl: NavController, public service: PeopleProvider) {

  }
  toggleReorder() {
    this.shouldReorder = !this.shouldReorder;
  }
}
