import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { User } from '../../models/user';
import firebase from 'firebase';
import{ AngularFireAuth} from 'angularfire2/auth';
import { RegisterPage } from '../register/register';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  //user = {} as User;

  constructor(private afAuth: AngularFireAuth, public navCtrl: NavController, public navParams: NavParams, public alertCtrl :AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  //Login(email,password){
    //firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
      // Handle Errors here.
      //var errorCode = error.code;
      //var errorMessage = error.message;
      // ...
    //});
    
        //this.navCtrl.push(TabsPage);
  
    //}

    async Login(email: string, password: string) {
      try {
        const result = await this.afAuth.auth.signInWithEmailAndPassword(email, password);
        if (result) {
          this.navCtrl.push(TabsPage);
        }  
      }
      catch (e) {
        console.error(e);
      }
      
    }
   
    Register(){
      this.navCtrl.push(RegisterPage);
    }
  }
