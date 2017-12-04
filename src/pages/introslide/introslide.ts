import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { SignupPage } from '../signup/signup';
import { HomePage } from '../home/home';
import { ChooserolePage } from '../chooserole/chooserole';
//import { Platform } from 'ionic-framework/ionic';
// import { InAppBrowser } from '@ionic-native/in-app-browser';
import { File } from '@ionic-native/file';
import { Transfer, FileUploadOptions, TransferObject } from '@ionic-native/transfer';
@Component({
  selector: 'page-introslide',
  templateUrl: 'introslide.html'
})
export class IntroslidePage {
    // cordova: any;
    
  
  constructor(public navCtrl: NavController, private transfer: Transfer,public platform : Platform,private file: File) {
  const fileTransfer: TransferObject = this.transfer.create();

    // this.file.checkDir(this.file.dataDirectory, 'finalArt').then(_ => console.log('Directory exists')).catch(err => console.log('Directory doesnt exist'));
    if(localStorage.getItem("USER_DATA") == null || localStorage.getItem("USER_DATA") == '' || localStorage.getItem("USER_DATA") == undefined)
    {
        // alert("lds");
        console.log("harman")
    }else{
      this.navCtrl.push(HomePage);
    }
  }
   loginPage(){
  this.navCtrl.push(LoginPage);
    }

    SignupPage(){
  this.navCtrl.push(SignupPage);
    }

 rolePage(){
  this.navCtrl.push(ChooserolePage);
 }

   homePage(){
  this.navCtrl.push(HomePage);
    }




  // window.open(url,"_system","location=yes,enableViewportScale=yes,hidden=no");
  //  const url = 'http://www.example.com/file.pdf';
  // fileTransfer.download(url, this.file.dataDirectory + 'file.pdf').then((entry) => {
  //   console.log('download complete: ' + entry.toURL());
  // }, (error) => {
  //   // handle error
  // });
}

