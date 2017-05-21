import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the PeopleProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class PeopleProvider {
  people = [
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
        "medium": "https://randomuser.me/api/portraits/med/men/36.jpg",
        "thumbnail": "https://randomuser.me/api/portraits/thumb/men/36.jpg"
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
        "medium": "https://randomuser.me/api/portraits/med/women/1.jpg",
        "thumbnail": "https://randomuser.me/api/portraits/thumb/women/1.jpg"
      }
    }
  ];
  constructor(public http: Http) {
    console.log('Hello PeopleProvider Provider');
  }
  getPeople() {
    return this.http.get('https://randomuser.me/api/?results=50')
    .map (res => res.json());
  }

}
