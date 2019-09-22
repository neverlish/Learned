import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { BackgroundImageCardsPage } from './bg-cards/bg-cards';
import { SocialCardsPage } from './social-cards/social-cards';

@Component({
  templateUrl: 'cards.html',
})

export class CardsPage {
  constructor(public navCtrl: NavController) {

  }

  openBackgroundImageCardsPage() {
    this.navCtrl.push(BackgroundImageCardsPage);
  }

  openSocialCardsPage() {
    this.navCtrl.push(SocialCardsPage);
  }
}
