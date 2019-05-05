import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Home2Page } from '../pages/home2/home2'
import { TabsPage } from '../pages/tabs/tabs';
import firebase from 'firebase'

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = Home2Page;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    var config = {
      apiKey: "AIzaSyCIv3Q-IUTIIm67PtpJsBfMZbcK40C17CE",
      authDomain: "uas-mobile-cp.firebaseapp.com",
      databaseURL: "https://uas-mobile-cp.firebaseio.com",
      projectId: "uas-mobile-cp",
      storageBucket: "uas-mobile-cp.appspot.com",
      messagingSenderId: "598975824582"
    };
    firebase.initializeApp(config);
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}
