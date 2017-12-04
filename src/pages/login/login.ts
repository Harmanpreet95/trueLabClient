import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { SignupPage } from '../signup/signup';
import { Http, Headers, RequestOptions } from '@angular/http';
import { LoadingController, AlertController } from 'ionic-angular';
import 'rxjs/add/operator/map';
import { HomePage } from '../home/home';
import { ForgotpwPage } from '../forgotpw/forgotpw';
import { DocsPage } from '../docs/docs';
import { MenuController } from 'ionic-angular';
import { Push, PushObject, PushOptions } from "@ionic-native/push";
import { Nav, Platform } from 'ionic-angular';
import { SchedulePage } from '../schedule/schedule';
import { CancelrequestPage } from '../cancelrequest/cancelrequest';
import { PendingrequestPage } from '../pendingrequest/pendingrequest';
import { IntroslidePage } from '../introslide/introslide';
import { ChooserolePage } from '../chooserole/chooserole';
import { ToastController } from 'ionic-angular';
import { Firebase } from '@ionic-native/firebase';
import { Appsetting } from '../../providers/appsetting';

import { ChangepwdPage } from '../changepwd/changepwd';
// import {Google/CloudMessaging.h}
// import { NativeStorage } from 'ionic-native';
// import { Platform } from 'ionic-angular';
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  public value = '';
  public user = '';
  public Dvictoken = '';
  public data = '';
  public Loading = this.loadingCtrl.create({
    content: 'Please wait...'
  });

  constructor(public navCtrl: NavController, public appsetting: Appsetting, public firebase: Firebase, public push: Push, public nav: Nav, public platform: Platform, public toastCtrl: ToastController, private modalCtrl: ModalController, public alertCtrl: AlertController, public http: Http, public loadingCtrl: LoadingController, public menuCtrl: MenuController) {

   // this.notification();
    localStorage.clear();
    window.localStorage.removeItem("Agency");
    window.localStorage.removeItem("USERID");
    window.localStorage.removeItem("USER_DATA");
    console.log("storage" + localStorage.getItem("Agency"));
    console.log(localStorage);
    this.menuCtrl.swipeEnable(false);
  }


  login(form) {

    //end			// console.log('Device UUID is: ' + this.device.uuid);

    console.log('hello')
    this.Loading.present();
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: headers });
    //  var url: string = 'https://truelabllc.com/truelab/api/users/login';
    var url: string = this.appsetting.myGlobalVar + 'users/login';
    var data1 = JSON.stringify({

      email: form.value.email,
      password: form.value.password,
      tokenid: this.Dvictoken,
      role: "client"

    });

    console.log(data1);

    this.http.post(url, data1, options).map(res => res.json()).subscribe(data => {
      this.Loading.dismiss();

      if (data.error == 0) {
        if (data.data.User.active == "1") {
          //  alert("active");
          this.data = data;
          console.log(this.data);
          localStorage.setItem("USER_DATA", JSON.stringify(data));
          // alert(data.msg);
          let toast = this.toastCtrl.create({
            message: data.msg,
            duration: 3000
          });
          toast.present();
          // alert(data.userid);
          var user_id = data.userid;

          localStorage.setItem("USERID", data.userid);
          console.log("Agencyname" + data.data.User.agencyname);

          if (data.data.User.agencyname == null) {
            // this.agency_name = data.data.User.agencyname;
            this.navCtrl.push(HomePage);
          } else {
            // this.agency_name = data.data.User.agencyname;
            localStorage.setItem("Agency", data.data.User.agencyname);
            // this.data = data.data.User;
            console.log("Agencynamelogin" + this.data);
            // this.navCtrl.push(Page)
            // this.navCtrl.push(DocsPage);
            this.navCtrl.setRoot(DocsPage);
          }
        } else {
          let toast = this.toastCtrl.create({
            message: "YOUR ACCOUNT IS NOT ACTIVATED YET!",
            duration: 3000
          });
          toast.present();

        }
        // this.navCtrl.push(HomePage);
      } else {
        // alert("else");
        this.Loading.dismiss();
        //  alert(data.msg);
        let toast = this.toastCtrl.create({
          message: data.msg,
          duration: 3000
        });
        toast.present();
      }
    }

      , err => {
        alert('error ->' + err);
        console.log("Error!:", err);
      }

    );

    // });

  }





  //  initPushNotification() {
  //  // alert('opened')
  //   if (!this.platform.is('cordova')) {
  //     console.warn("Push notifications not initialized. Cordova is not available - Run in physical device");
  //    //alert('Push notifications not initialized. ')
  //     return;
  //   }
  //   const options: PushOptions = {
  //     android: { senderID: '775287115574' },
  //     ios: {
  //           alert: "true",
  //           badge: false,
  //           sound: "true"
  //     },
  //     windows: {}
  //   };
  //   const pushObject: PushObject = this.push.init(options);

  //   pushObject.on('registration').subscribe((data: any) => {
  //     console.log("device token ->", data.registrationId);
  //     //alert(data.registrationId)
  //     this.Dvictoken = data.registrationId;
  //     // alert("harman device token")
  //     // alert("harman device token" +this.Dvictoken);
  //     //TODO - send device token to server
  //   });

  //   pushObject.on('notification').subscribe((data: any) => {
  //     // alert("harman+++message")
  //     // alert(data.message)
  //     //if user using app and push notification comes
  //     if (data.additionalData.foreground) {
  //       // alert("tapped");
  //    // if application open, show popup
  //    let confirmAlert = this.alertCtrl.create({
  //      title: 'True Lab',
  //      message: '<center>'+ data.message +'</center>',
  //      buttons: [{
  //     text: 'Ignore',
  //     role: 'cancel'
  //      }, {
  //     text: 'View',
  //     handler: () => {
  //       // alert("2nd message");
  //         // alert(data.message);
  //         this.value=data.message;
  //           if(this.value == "A new test has been accepted" || this.value == "A test has been reschduled by the user" || this.value == "A test has been reschduled by the patient"){
  //               //alert('arvinder');
  //               this.user = localStorage.getItem('USER_DATA')
  //               console.log( 'User_data' + this.user );
  //               if(this.user == null){
  //                      this.nav.push(LoginPage);
  //               }else{
  //                     this.nav.push(SchedulePage);
  //               }


  //             }
  //             else if(this.value == "A new test has been cancelled by the patient") {

  //               //alert('cancel request');
  //               this.user = localStorage.getItem('USER_DATA')
  //               console.log( 'User_data' + this.user );
  //               if(this.user == null){
  //                      this.nav.push(LoginPage);
  //               }else{
  //                     this.nav.push(CancelrequestPage);
  //               }

  //             }
  //             else if(this.value == "Your Test has been assign to the Phlebotomist")
  //             {
  //               //alert('done');
  //                  this.user = localStorage.getItem('USER_DATA')
  //               console.log( 'User_data' + this.user );
  //               if(this.user == null){
  //                      this.nav.push(LoginPage);
  //               }else{
  //                     this.nav.push(PendingrequestPage);
  //               }

  //             }
  //             else if(this.value == "A New Patient Added")
  //             {
  //             //  alert('new patient add ');
  //               this.user = localStorage.getItem('USER_DATA')
  //               console.log( 'User_data' + this.user );
  //               if(this.user == null){
  //                      this.nav.push(LoginPage);
  //               }else{
  //                     this.nav.push(HomePage);
  //               }
  //             }
  //             else{
  //              // alert('invalid request');
  //             //  alert('else part');
  //               this.nav.push(LoginPage);
  //             }
  //           }
  //           }]
  //         });
  //         confirmAlert.present();
  //     } else if(this.value == "A new test has been accepted")  {
  //              this.nav.push(IntroslidePage);
  //             //  alert("Push notification clicked");
  //             // alert(data.message);
  //           }
  //           else{
  //            // alert("sim");
  //           }

  //   });


  //   pushObject.on('error').subscribe(error => {
  //   console.error('Error with Push plugin', error)
  //   // alert(JSON.stringify(error))
  // })
  //    }


  notification() {
    // alert('notify');
    console.log("login")
    this.firebase.onTokenRefresh()
      .subscribe((token: string) => console.log(`Got a new token ${token}`));

    this.firebase.getToken()
      .then((token) => {
        console.log('token retrieved ' + token)
        // alert('token ' +token);
        this.Dvictoken = token;
        //console.log(signup);
        console.log('dvcToken' + this.Dvictoken);
      });


    this.firebase.onNotificationOpen()
      .subscribe((data: any) => {
        // alert("harman");
        console.log(data);
        // alert('rs ->'+ JSON.stringify(data));
        console.log('rs ->' + JSON.stringify(data));
        //   if (data.tap) {
        // 	alert('tapped' + JSON.stringify(data))

        // } else if (!data.tap) {
        // 	alert('not tapped' + JSON.stringify(data));
        // } else {

        // 	console.log('else')
        // 	alert('something went wrong')

        // }


        if (data.tap) {
          // alert('if');
          this.user = localStorage.getItem('USER_DATA')
          console.log('User_data' + this.user);
          if (this.user == null) {
            this.nav.push(IntroslidePage);
          } else {
            this.nav.push(HomePage);
          }


        } else if (!data.tap) {
          // alert('elseif');
          let confirmAlert = this.alertCtrl.create({
            title: '<center>' + data.aps.alert.title + '</center>',
            message: '<center>' + data.aps.alert.body + '</center>',
            buttons: [{
              text: 'Ignore',
              role: 'cancel'
            }, {
              text: 'View',
              handler: () => {
                // alert("2nd message");
                // alert(data.aps.alert.body);
                this.value = data.aps.alert.body;
                if (this.value == "A new test has been accepted" || this.value == "A test has been reschduled by the user" || this.value == "A test has been reschduled by the patient") {
                  //alert('arvinder');
                  this.user = localStorage.getItem('USER_DATA')
                  console.log('User_data' + this.user);
                  if (this.user == null) {
                    this.nav.push(LoginPage);
                  } else {
                      this.nav.push(SchedulePage);

                  }


                }
                else if (data.aps.alert.title = 'Please change your password'){
                  if (this.user == null) {
                    this.nav.push(LoginPage);
                  } else {
                    this.nav.push(ChangepwdPage);
                  }
                } 
                else if (this.value == "A new test has been cancelled by the patient") {

                  //alert('cancel request');
                  this.user = localStorage.getItem('USER_DATA')
                  console.log('User_data' + this.user);
                  if (this.user == null) {
                    this.nav.push(LoginPage);
                  } else {
                    this.nav.push(CancelrequestPage);
                  }

                }
                else if (this.value == "Your Test has been assign to the Phlebotomist") {
                  //alert('done');
                  this.user = localStorage.getItem('USER_DATA')
                  console.log('User_data' + this.user);
                  if (this.user == null) {
                    this.nav.push(LoginPage);
                  } else {
                    this.nav.push(PendingrequestPage);
                  }

                }
                else if (this.value == "A New Patient Added") {
                  //  alert('new patient add ');
                  this.user = localStorage.getItem('USER_DATA')
                  console.log('User_data' + this.user);
                  if (this.user == null) {
                    this.nav.push(LoginPage);
                  } else {
                    this.nav.push(HomePage);
                  }
                }
                else {
                  // alert('invalid request');
                  //  alert('else part');
                  this.nav.push(LoginPage);
                }

              }
            }]
          });
          confirmAlert.present();
        } else {
          // alert('else');
          alert('err');
        }
      });
  }


  //onTokenRefresh




  forget() {
    this.navCtrl.push(ForgotpwPage);
  }

  rolePage() {
    this.navCtrl.push(ChooserolePage);
  }

  signup() {
    this.navCtrl.push(SignupPage);
  }
}


