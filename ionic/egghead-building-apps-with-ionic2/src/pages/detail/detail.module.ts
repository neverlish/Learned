import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DetailPage } from './detail';

@NgModule({
  declarations: [
    DetailPage,
  ],
  imports: [
    IonicPageModule.forChild(DetailPage),
  ],
  exports: [
    DetailPage
  ]
})
export class DetailPageModule {}
