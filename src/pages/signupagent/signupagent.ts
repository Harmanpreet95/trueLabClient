import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NavController, ModalController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Appsetting } from '../../providers/appsetting';
import { LoadingController } from 'ionic-angular';
import 'rxjs/add/operator/map';
import { MenuController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
@Component({
  selector: 'page-signupagent',
  templateUrl: 'signupagent.html'
})

export class SignupagentPage {
  email: any;
  submitted = false;
  onSubmit() { this.submitted = true; }
  public data = '';

  public Loading = this.loadingCtrl.create({
    content: 'Please wait...'

  });
  constructor(public navCtrl: NavController, public menuCtrl: MenuController, public toastCtrl: ToastController,private modalCtrl: ModalController, public http: Http, public loadingCtrl: LoadingController, public appsetting: Appsetting) {
    this.menuCtrl.swipeEnable(false);
  }


  public register(signup) {
    console.log(signup);

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: headers });
    // var url:string = 'http://rakesh.crystalbiltech.com/truelab/api/users/registration';
    var url: string = this.appsetting.myGlobalVar + 'users/agencyregistration';

    var data1 = JSON.stringify({
        // firstname: null,
        // lastname: '',
        agencyemail: signup.value.email, 
        // username:signup.value.email, 
        password: signup.value.password,
        cpassword: signup.value.cpassword,
        // role: 'client',
        agencyname : signup.value.agencyname,
        agencyfax: signup.value.Agencyfax,
        agencyphonenumber: signup.value.agencyphone,
        // npi: '',
        // fax : '',
        address: signup.value.address,
        address2: signup.value.address2,
        // docname: signup.value.Docname,
        // phonenumber:'',
        city: signup.value.city,
        state: signup.value.state,
        zipcode: signup.value.zipcode,
        

        ///////////////////////////////////////


     
    });

    console.log(data1);
    //  return false
    if (signup.value.password == signup.value.cpassword) {
        this.Loading.present();
        
        this.http.post(url, data1, options).map(res => res.json()).subscribe(data => {
            this.Loading.dismiss();
            this.data = data;
            console.log(this.data);
            if (data.status == 0) {
              // alert(data.msg);
              let toast = this.toastCtrl.create({
                message: data.msg,
                duration: 3000
              });
              toast.present();
              this.navCtrl.push(LoginPage);
            } else {
              // alert(data.msg);
              let toast = this.toastCtrl.create({
              message: data.msg,
              duration: 3000
            });
            toast.present();
            }
        }, err => {
          this.Loading.dismiss();
          console.log("Error!:", err.json());
        });
    }
    else {
    //  alert('Password Mismatch');
     let toast = this.toastCtrl.create({
              message: 'Password Mismatch',
              duration: 3000
            });
            toast.present();
      // this.Loading.dismiss();
    }
  }

  signin() {
    this.navCtrl.push(LoginPage);
  }

}