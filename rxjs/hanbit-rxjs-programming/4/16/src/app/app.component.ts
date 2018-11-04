import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  template: `
    <input type="text" [formControl]="name">
    <div> 입력된 내용은 {{ name$ | async }}</div>
  `,
})
export class AppComponent {
  name = new FormControl();
  name$ = this.name.valueChanges;
}
