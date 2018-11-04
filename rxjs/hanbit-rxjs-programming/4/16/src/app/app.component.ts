import { Component } from '@angular/core';
import { interval } from 'rxjs';

@Component({
  selector: 'app-root',
  template: '<h1>interval: {{ source$ | async }}</h1>',
})
export class AppComponent {
  x = 0;
  source$ = interval(1000);
}
