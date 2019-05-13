import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';

import { User } from '../../models/user';
import firebase from 'firebase';
import{ AngularFireAuth} from 'angularfire2/auth';
import { RegisterPage } from '../register/register';


/**
 * Generated class for the Home2Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
//user = {} as User;


  constructor(private afAuth: AngularFireAuth, public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController) {

    //@ViewChild('email') uname;
    //@ViewChild('password') password;

    //Login(email,password){
    //firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
    // Handle Errors here.
    //var errorCode = error.code;
    //var errorMessage = error.message;
    // ...
    //});

    //this.navCtrl.push(TabsPage);

    //}
  }
  async Login(email: string, password: string) {
    try {
      const result = await this.afAuth.auth.signInWithEmailAndPassword(email, password);
      if (result) {
        this.navCtrl.push(TabsPage);
      }
    } catch (e) {
      console.error(e);
    }

  }

  Register() {
    this.navCtrl.push(RegisterPage);
  }

  signIn() {
    //if(this.uname.value == "admin" && this.password.value == "admin"){
    //  let alert = this.alertCtrl.create({
    //  title : 'Successfully Login',
    //message: 'You success login 100% and join with many book',
    //buttons: ['OK']
    //});
    //alert.present();
    this.navCtrl.push(TabsPage);
    //}

  }
}
