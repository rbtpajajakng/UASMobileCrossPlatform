import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the QrpopPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-qrpop',
  templateUrl: 'qrpop.html',
})
export class QrpopPage {
  public qr;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.qr = this.navParams.get("qr");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad QrpopPage');
  }

}
