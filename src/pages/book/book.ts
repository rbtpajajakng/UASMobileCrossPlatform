import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import firebase from 'firebase'

/**
 * Generated class for the BookPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-book',
  templateUrl: 'book.html',
})
export class BookPage {
  bookInfo:any;

  // qrData = null;
  createdCode = null;
  // scannedCode = null;

  constructor(public navCtrl: NavController, public navParams: NavParams, public barcodeScanner: BarcodeScanner ) {
    this.bookInfo = navParams.data;

    var qrcodedata = {
      uid: firebase.auth().currentUser.uid,
      judul: navParams.get("judul")
    }

    this.createdCode = JSON.stringify(qrcodedata);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BookPage');
  }

  // createCode(){
  //   this.createdCode = this.bookInfo;
  // }

  // scanCode(){
    // this.barcodeScanner.scan().then(barcodeData =>{
      // this.scannedCode = barcodeData.text;
    // })
  // }

}
