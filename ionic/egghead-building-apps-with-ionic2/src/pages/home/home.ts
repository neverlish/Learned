import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { PeopleProvider } from '../../providers/people/people';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public people = [];
  public shouldReorder = false;
  constructor(public navCtrl: NavController, public service: PeopleProvider) {
    this.service.getPeople()
    .subscribe (data => this.people = data.results);
  }
  toggleReorder() {
    this.shouldReorder = !this.shouldReorder;
  }
}
