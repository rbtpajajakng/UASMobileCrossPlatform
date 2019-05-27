import firebase  from 'firebase/app';
import { Component } from '@angular/core';
import { NavController, App, AlertController } from 'ionic-angular';
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {

  constructor(public navCtrl: NavController, public alertCtrl: AlertController, private app:App) {

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

}
