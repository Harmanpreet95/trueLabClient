import { Component } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { NavController, ModalController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import {Http, Headers, RequestOptions} from '@angular/http';
import { Appsetting } from '../../providers/appsetting';
import {LoadingController} from 'ionic-angular';
import 'rxjs/add/operator/map';
import {MenuController} from 'ionic-angular';
import { ToastController } from 'ionic-angular';
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})

export class SignupPage {
    email: any;
  submitted = false;
  onSubmit() { this.submitted = true; }
public data='';

public Loading=this.loadingCtrl.create({
    content: 'Please wait...'
    
  });
 constructor( public navCtrl: NavController, public menuCtrl:MenuController,public toastCtrl: ToastController,private modalCtrl: ModalController, public http:Http, public loadingCtrl:LoadingController , public appsetting: Appsetting) {
   this.menuCtrl.swipeEnable(false);
   }
   
  //  onInput(value) {
  //       if (this.email.valid) {
  //     console.log("yes")
      
  //   } else {
  //     console.log("nope")
  //   }
  //     }
    // } {
    // if (this.phone.valid) {
    //   alert("yes")
      
    // } else {
    //   alert("nope")
    // }
 public register(signup){
 console.log(signup);
     
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let options= new RequestOptions({ headers: headers });
   // var url:string = 'http://rakesh.crystalbiltech.com/truelab/api/users/registration';
 var url:string = this.appsetting.myGlobalVar+'users/registrationclient';

  var data1 = JSON.stringify({
            firstname:signup.value.docname,
            // lastname:null,
            email:signup.value.email,
            username:signup.value.email,
            password:signup.value.password,
            cpassword: signup.value.cpassword,
            role:'client',
            // agencyfax: null,
            phonenumber:signup.value.phone,
            npi:signup.value.npi,
            address:signup.value.address,
            address2:signup.value.address2,
            city:signup.value.city,
            state:signup.value.state,
            zipcode:signup.value.zipcode,
            fax:signup.value.fax,
            // agencyname: null,
            // agencyphonenumber : null
          });
          
    console.log(data1);

  //  return false;
    if(signup.value.password == signup.value.cpassword){
       this.Loading.present();


    this.http.post(url, data1, options).map(res=>res.json()).subscribe(data=>{
this.Loading.dismiss();
this.data=data;
      console.log(this.data);
      if(data.isSuccess == true)
      {
        // alert(data.msg);
        let toast = this.toastCtrl.create({
            message: data.msg,
            duration: 3000
          });
          toast.present();
        this.navCtrl.push(LoginPage);
      }else{
        // alert(data.msg);
        let toast = this.toastCtrl.create({
          message: data.msg,
          duration: 3000
        });
        toast.present();
      }
            
     
    }, err=>{
      this.Loading.dismiss();
      console.log("Error!:", err.json());
    });
	
 }
  else {

  // alert('Password Mismatch');
  let toast = this.toastCtrl.create({
      message: 'Password Mismatch',
      duration: 3000
    });
    toast.present();
 // this.Loading.dismiss();
 }
}
  signin()
{
this.navCtrl.push(LoginPage);
}


 
}











   
      