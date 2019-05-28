import { QrpopPage } from './../qrpop/qrpop';
import firebase  from 'firebase/app';
import { Component } from '@angular/core';
import { NavController, App, AlertController, PopoverController } from 'ionic-angular';
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {
  listBuku:Array<any>;
  constructor(public navCtrl: NavController, public alertCtrl: AlertController, public popoverCtrl:PopoverController, private app:App) {

  }

  ionViewDidLoad(){
    
    var uid = firebase.auth().currentUser.uid;
    var dbref = firebase.database().ref("/pinjaman/"+uid);
    dbref.on('value', snapshot => {
      // kosongin dulu arraynya, biar ga nimpa di view
      this.listBuku = [];
      // masukin setiap value dari buku/uid ke array listBuku
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

  showQr(qr?){
    if(qr == undefined){
      qr = "https://i.imgur.com/wtnbDvX.jpg";
    }
    let popover = this.popoverCtrl.create(QrpopPage, {qr:qr});
    popover.present();
  }
}
