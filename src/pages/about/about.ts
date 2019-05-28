import  firebase  from 'firebase/app';
import { Component } from '@angular/core';
import { NavController, AlertController, App } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { LoginPage } from '../login/login';
import { File, Entry, FileError } from '@ionic-native/file';
import { ImagePicker, ImagePickerOptions } from '@ionic-native/image-picker';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  photo:any;

  judul:any;
  gambar:any;
  pengarang:any;
  tahun:any;

  constructor(public navCtrl: NavController, public alertCtrl: AlertController, private file:File, private camera:Camera, private app:App, private imgPicker:ImagePicker) {

  }

  openCamera(){
    const options:CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
    }
    
    this.camera.getPicture(options).then((ImageData)=>{
      this.photo = "data:image/jpeg;base64,"+ImageData;
      const currentName = ImageData.replace(/^.*[\\\/]/,'');
      const path = ImageData.replace(/[^\/]*$/,'');
      this.file.moveFile(path, currentName, this.file.dataDirectory, currentName)
      .then((data:Entry)=>{
        this.gambar = data.nativeURL;
        this.camera.cleanup();
      })
      .catch((err: FileError)=>{
        this.gambar = "";
        this.camera.cleanup();
        var alert = this.alertCtrl.create({
          title: "Hmmm...",
          subTitle: "Sepertinya ada yang salah...\n "+err,
          buttons: ['OK']
        });
        alert.present();
      });
      console.log(this.photo);
    }, (err)=>{
      var alert = this.alertCtrl.create({
        title: "Hmmm...",
        subTitle: "Sepertinya ada yang salah...\n "+err,
        buttons: ['OK']
      });
      alert.present();
    });
  }

  openGallery(){
    // this.filechooser.open()
    // .then((uri) => {
    //   var alert = this.alertCtrl.create({
    //     title: "Hmmm...",
    //     subTitle: uri,
    //     buttons: ['OK']
    //   });
    //   alert.present();
    // })
    // .catch((err)=>{
    //   var alert = this.alertCtrl.create({
    //     title: "Hmmm...",
    //     subTitle: "Sepertinya ada yang salah...\n "+err,
    //     buttons: ['OK']
    //   });
    //   alert.present();
    // });
    const galleryOptions:ImagePickerOptions = {
      maximumImagesCount: 1
    }
    this.imgPicker.getPictures(galleryOptions).then((res)=>{
      this.gambar = res;
    }).catch((err)=>{
      var alert = this.alertCtrl.create({
        title: "Hmmm...",
        subTitle: "Sepertinya ada yang salah...\n "+err,
        buttons: ['OK']
      });
      alert.present();
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
          subTitle: "Ups, bukunya ngak bisa dimasukin ke database\n"+error,
          buttons: ['OK']
        });
        alert.present();
      } else{
        this.judul = "";
        this.pengarang = "";
        this.tahun = "";
        this.gambar = "";
        var alert = this.alertCtrl.create({
          title: "Noice!",
          subTitle: "Koleksi buku kamu bertambah!",
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
