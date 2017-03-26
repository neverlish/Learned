import { Component } from '@angular/core';
import { Person } from '../../models/person';
import { NavController } from 'ionic-angular';
import { DetailPage } from './detail/detail';

@Component({
  templateUrl: 'list.html',
})

export class ListPage {
  persons: Person[] = [];

  constructor(public navCtrl: NavController) {
    this.persons.push(new Person('assets/img/venkman.jpg','Venkman',"Back off man, I'm a scientist"));
    this.persons.push(new Person('assets/img/spengler.jpg','Egon',"We're gonna go full stream."));
    this.persons.push(new Person('assets/img/stantz.jpg','Ray',"Ugly little spud, isn't he?"));
  }

  openDetailPage(person) {
    this.navCtrl.push(DetailPage, {
      profileImage: person.avatar,
      name: person.name,
      detail: person.detail,
    });
  }
}
