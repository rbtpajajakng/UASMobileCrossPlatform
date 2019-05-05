import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import firebase  from 'firebase';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  // Array buat nampung list-list buku
  public listBuku: Array<any> = [];

  constructor(public navCtrl: NavController) {
    
  }

  ionViewDidLoad(){
    // reference nanti asdasfasvasdasvsadbafdb diganti sama uid
    var dbref = firebase.database().ref("/asdasfasvasdasvsadbafdb/buku");
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

}
