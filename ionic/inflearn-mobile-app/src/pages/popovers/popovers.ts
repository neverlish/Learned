import { Component, ViewChild, ElementRef } from '@angular/core';
import { PopoverController, NavParams } from 'ionic-angular';

@Component({
  templateUrl: 'popovers.html',
})

export class PopoverPage {
  @ViewChild('popoverText', { read: ElementRef }) text: ElementRef;
  constructor(public popoverCtrl: PopoverController) {

  }

  presentPopover(myEvent) {
    let popover = this.popoverCtrl.create(PopoverDetailPage, {
      textElem: this.text.nativeElement,
    });
    popover.present({ ev: myEvent });
  }
}

@Component({
  template: `
    <ion-list no-lines>
      <button ion-item detail-none (click)='changeFontSize("larger")'>
        +
      </button>
      <button ion-item detail-none (click)='changeFontSize("smaller")'>
        -
      </button>
    </ion-list>
  `
})

export class PopoverDetailPage {
  textElem;
  constructor(public navParams: NavParams) {
    this.textElem = this.navParams.get('textElem');
  }

  changeFontSize(direction) {
    this.textElem.style.fontSize = direction;
  }
}
