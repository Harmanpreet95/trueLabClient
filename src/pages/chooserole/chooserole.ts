import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { SignupPage } from '../signup/signup';
import { SignupagentPage } from '../signupagent/signupagent';
import { HomePage } from '../home/home';




@Component({
  selector: 'page-chooserole',
  templateUrl: 'chooserole.html'
})
export class ChooserolePage {

  constructor(public navCtrl: NavController) {
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

    SignupAgency(){
 this.navCtrl.push(SignupagentPage);
    }

   homePage(){
  this.navCtrl.push(HomePage);
    }
 
}
