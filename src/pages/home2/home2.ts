import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';

/**
 * Generated class for the Home2Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-home2',
  templateUrl: 'home2.html',
})
export class Home2Page {

  //@ViewChild('email') uname;
  //@ViewChild('password') password;


  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl :AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Home2Page');
  }

  signIn(){
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


