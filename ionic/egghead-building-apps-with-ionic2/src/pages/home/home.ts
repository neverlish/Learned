import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { PeopleProvider } from '../../providers/people/people';
import { DetailPage } from '../detail/detail';

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
  doRefresh(e) {
    this.service.getPeople()
    .subscribe (
      data => this.people.unshift(...data.results),
        err => console.log(err),
        () => e.complete()
    )
  }
  doInfinite(e) {
    this.service.getPeople()
    .subscribe (
      data => this.people.push(...data.results),
        err => console.log(err),
        () => e.complete()
    )
  }
  pushPage(user) {
    // this.navCtrl.push(DetailPage, user);
    this.navCtrl.setPages([
      {page: HomePage},
      {page: DetailPage, params: this.people[5]},
      {page: HomePage},
      {page: DetailPage, params: user}
    ])
  }
}
