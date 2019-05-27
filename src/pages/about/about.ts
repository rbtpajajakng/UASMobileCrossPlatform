import  firebase  from 'firebase/app';
import { Component } from '@angular/core';
import { NavController, AlertController, App } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  photo:any;
  judul:any;

  constructor(public navCtrl: NavController, public alertCtrl: AlertController, private camera:Camera, private app:App) {

  }

  takePic(){
    const options:CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options).then((ImageData)=>{
      this.photo = "data:image/jpeg;base64,"+ImageData;
      console.log(this.photo);
    }, (err)=>{
      console.log(err);
    });
  }

  // takePic(){
  //   const options:CameraOptions = {
  //     quality: 100,
  //     destinationType: this.camera.DestinationType.FILE_URI,
  //     encodingType: this.camera.EncodingType.JPEG,
  //     mediaType: this.camera.MediaType.PICTURE
  //   }

  //   this.camera.getPicture(options).then((ImageData)=>{
  //     this.photo = "data:image/jpeg;base64,"+ImageData;
  //     console.log(this.photo);
  //   }, (err)=>{
  //     console.log(err);
  //   });
  // }

  addBook(judul:String, pengarang:String, tahun?:String, gambar?:String){
    var db = firebase.database();
    var uid = firebase.auth().currentUser.uid;

    if (tahun == undefined) {
      tahun = "-"
    }
    if (gambar == undefined) {
      gambar = "https://i.imgur.com/wtnbDvX.jpg"
    }
    db.ref("/buku/"+uid+"/"+judul.toLowerCase()).set({
      judul: judul,
      pengarang: pengarang,
      tahun: tahun,
      gambar: gambar,
      pinjam: false
    }, (error) => {
      if(error){
        var alert = this.alertCtrl.create({
          title: "Error",
          subTitle: "Ups, bukunya ngak bisa dimasukin ke database",
          buttons: ['OK']
        });
        alert.present();
      } else{
        judul = "";
        var alert = this.alertCtrl.create({
          title: "Berhasil!",
          subTitle: "Noice, koleksi buku kamu bertambah!",
          buttons: ['OK']
        });
        alert.present();
      }
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
}
