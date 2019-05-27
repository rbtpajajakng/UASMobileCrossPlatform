import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { User } from '../../models/user';
import firebase from 'firebase';
import { TabsPage } from '../tabs/tabs';
import{ AngularFireAuth} from 'angularfire2/auth';
import {LoginPage} from '../login/login'

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {


  user = {} as User;

  constructor(private afAuth: AngularFireAuth,public navCtrl: NavController, public navParams: NavParams,
    public alertCtrl :AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  //Register(email,password){
    //console.log(email + " " + password);
    //firebase.auth().createUserWithEmailAndPassword(email, password).catch((error) => {
      // Handle Errors here.
      //var errorCode = error.code;
      //var errorMessage = error.message;
      // ...

      //this.navCtrl.push(TabsPage);
    //});

    async Register(email: string, password: string) {
      try {
        const result = await this.afAuth.auth.createUserWithEmailAndPassword(
         email,
         password
        );
        if (result) {
          this.navCtrl.push(LoginPage);
        }
      } catch (e) {
        let alert = this.alertCtrl.create({
          title: 'Error',
          subTitle: "Ada yang " + e,
          buttons: ['OK']
        });
        alert.present();
      }
      
    }

    Cancel(){
      this.navCtrl.popToRoot();
    }

}


