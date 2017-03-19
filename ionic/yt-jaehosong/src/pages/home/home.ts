import { Component, ViewChild } from '@angular/core';
import { Content } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  y: number = 0;
  onClickScroll(myContent) {
    myContent.scrollTo(0, this.y+= 80, 100);
  }
  // @ViewChild (Content) content: Content;
  // // ViewChild는 템플릿이 만들어지기 전에 참조 가능
  // onClickScroll() {
  //   this.content.scrollTo(0, this.y+= 80, 100);
  // }
}
