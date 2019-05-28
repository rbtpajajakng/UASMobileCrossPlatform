import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { QrpopPage } from './qrpop';

@NgModule({
  declarations: [
    QrpopPage,
  ],
  imports: [
    IonicPageModule.forChild(QrpopPage),
  ],
})
export class QrpopPageModule {}
