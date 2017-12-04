import { Component } from '@angular/core';
import { NavController, NavParams, ModalController,ViewController,Events } from 'ionic-angular';
import { IntroslidePage } from '../introslide/introslide';
import {Http, Headers, RequestOptions} from '@angular/http';
import { LoadingController, AlertController } from 'ionic-angular';
// import {LoadingController} from 'ionic-angular';
import 'rxjs/add/operator/map';
import { Appsetting } from '../../providers/appsetting';
import { DetailsmodelPage } from '../detailsmodel/detailsmodel';
import { PatienteditPage } from '../patientedit/patientedit';
import { HomePage } from '../home/home';
import { DatePipe } from '@angular/common';
import { HistoryPage } from '../history/history';
import { ToastController } from 'ionic-angular';
@Component({
  selector: 'page-docs',
  templateUrl: 'docs.html'
})
export class DocsPage {
    public Loading=this.loadingCtrl.create({
    content: 'Please wait...'
  });
  public data='';
   public docs:any;
   public Agency_name :any;
    serializeObj(obj) {
    var result = [];

    for (var property in obj)
        result.push(encodeURIComponent(property) + "=" + encodeURIComponent(obj[property]));

    return result.join("&");
}
 constructor( public navCtrl: NavController,public toastCtrl: ToastController, events : Events, public loadingCtrl:LoadingController,public viewCtrl:ViewController, private modalCtrl: ModalController,public http:Http,public loadingctrl:LoadingController,public navParams:NavParams,public appsetting:Appsetting) {
this.Doclist();
 events.publish('user:login');
 }

Doclist(){
  this.Loading.present();
    this.Agency_name = localStorage.getItem("Agency");
    console.log("Agency name is on home"+this.Agency_name);
    this.data =  this.Agency_name;
    console.log("docs"+this.data);
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    let options= new RequestOptions({ headers: headers });
    var url:string = this.appsetting.myGlobalVar + 'users/agencydoctorlist';
    // console.log(this.local.get('USERID'));
    var data_all = {

            agencyname : this.Agency_name
    }
    var serialized = this.serializeObj(data_all);
    this.http.post(url,serialized, options).map(res=>res.json()).subscribe(dat=>{

// this.data =dat.data[0].User.id;
// console.log("Doctor list "+ this.data);
 this.Loading.dismiss();
 if(dat.error == 0){
    
    if(dat.data[0].User.firstname == null){
         let toast = this.toastCtrl.create({
          message: "No Doctors Yet!",
          duration: 3000
        });
        toast.present();
    }else{
    this.docs = dat.data;
    console.log("listing")
    console.log(this.docs);
    }

    }else{
      alert(dat.msg);
    }

    // alert("homepage")
  
  //  if(data.error == 0){
  //    this.Loading.dismiss();
  //    this.resp=data.msg;
  //   this.errorValue = '2';
    
    
  //  }else{
  //        this.Loading.dismiss();
  //   //  alert("No DATA AVAILABLE");
  //    let toast = this.toastCtrl.create({
  //     message: "No DATA AVAILABLE",
  //     duration: 3000
  //   });
  //   toast.present();
   },error => {

        // alert('error');
        alert(error);
        console.log('Error: ' + error);
      }
);
}
doctorId(id){
// alert("Doctor ID is" + id);
localStorage.setItem("USERID", id);
 this.navCtrl.push(HomePage);
}









}











   
      