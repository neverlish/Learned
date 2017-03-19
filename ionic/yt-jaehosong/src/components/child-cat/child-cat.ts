import { Component } from '@angular/core';

@Component({
  selector: 'child-cat',
  templateUrl: 'child-cat.html'
})

export class ChildCat {
  no: number = 0;
  onClickNo() {
    this.no ++;
  }
}
