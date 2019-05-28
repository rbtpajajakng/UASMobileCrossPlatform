import { Component } from '@angular/core';
import { NavController, AlertController, App } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import firebase  from 'firebase';

import {LoginPage} from '../login/login'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  qrData = null;
  createdCode = null;
  scannedCode = null;

  // Array buat nampung list-list buku
  public listBuku: Array<any> = [];

  constructor(public navCtrl: NavController, public alertCtrl:AlertController, private app:App,
    private barcodeScanner:BarcodeScanner ) {
    
  }

  ionViewDidLoad(){
    // reference nanti asdasfasvasdasvsadbafdb diganti sama uid
    var uid = firebase.auth().currentUser.uid;
    var dbref = firebase.database().ref("/buku/"+uid);
    dbref.on('value', snapshot => {
      // kosongin dulu arraynya, biar ga nimpa di view
      this.listBuku = [];
      // masukin setiap value dari asdasfasvasdasvsadbafdb/buku ke array listBuku
      snapshot.forEach(buku => {
        this.listBuku.push(buku.val());
        console.log(buku.val());
        return false;
      });
    });
  }

  logout(){
    firebase.auth().signOut().then(()=>{
      this.app.getRootNav().setRoot(LoginPage);
    }).catch((err)=>{
      var alert = this.alertCtrl.create({
        title: "Ups...",
        subTitle: "Aduh, lagi ngak bisa logout nih! "+err,
        buttons: ['OK']
      });
      alert.present();
    });
  }

  createCode(){
    this.createdCode = this.qrData;
  }

  scanCode(){
    this.barcodeScanner.scan().then(barcodeData =>{
      this.scannedCode = barcodeData.text;
    })
  }

  

}
